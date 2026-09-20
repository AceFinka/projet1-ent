const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Chaque unité est exprimée relativement à l'unité de base de sa catégorie.
const units = {
  longueur: {
    metre: { label: 'Mètres', symbol: 'm', factor: 1 },
    kilometre: { label: 'Kilomètres', symbol: 'km', factor: 1000 },
    pied: { label: 'Pieds', symbol: 'ft', factor: 0.3048 },
    pouce: { label: 'Pouces', symbol: 'in', factor: 0.0254 },
    mile: { label: 'Milles', symbol: 'mi', factor: 1609.344 }
  },
  volume: {
    litre: { label: 'Litres', symbol: 'L', factor: 1 },
    millilitre: { label: 'Millilitres', symbol: 'mL', factor: 0.001 },
    gallon: { label: 'Gallons (US)', symbol: 'gal', factor: 3.785411784 },
    tasse: { label: 'Tasses (US)', symbol: 'cup', factor: 0.2365882365 }
  },
  poids: {
    kilogramme: { label: 'Kilogrammes', symbol: 'kg', factor: 1 },
    gramme: { label: 'Grammes', symbol: 'g', factor: 0.001 },
    livre: { label: 'Livres', symbol: 'lb', factor: 0.45359237 },
    once: { label: 'Onces', symbol: 'oz', factor: 0.028349523125 }
  },
  temperature: {
    celsius: { label: 'Celsius', symbol: '°C' },
    fahrenheit: { label: 'Fahrenheit', symbol: '°F' },
    kelvin: { label: 'Kelvin', symbol: 'K' }
  },
  puissance: {
    watt: { label: 'Watts', symbol: 'W', factor: 1 },
    kilowatt: { label: 'Kilowatts', symbol: 'kW', factor: 1000 }
  }
};

function convertTemperature(value, from, to) {
  let celsius = value;
  if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
  if (from === 'kelvin') celsius = value - 273.15;
  if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
  if (to === 'kelvin') return celsius + 273.15;
  return celsius;
}

app.get('/api/units', (_req, res) => res.json(units));

app.post('/api/convert', (req, res) => {
  const { category, from, to, value } = req.body;
  const numericValue = Number(value);
  const categoryUnits = units[category];

  if (!categoryUnits || !categoryUnits[from] || !categoryUnits[to] || !Number.isFinite(numericValue)) {
    return res.status(400).json({ error: 'Paramètres de conversion invalides.' });
  }

  const result = category === 'temperature'
    ? convertTemperature(numericValue, from, to)
    : (numericValue * categoryUnits[from].factor) / categoryUnits[to].factor;

  return res.json({
    value: numericValue,
    result,
    from: categoryUnits[from],
    to: categoryUnits[to]
  });
});

app.listen(port, () => console.log(`API disponible sur http://localhost:${port}`));
