import { useEffect, useMemo, useState } from 'react';
import {
  Alert, AppBar, Box, Button, Chip, Container, FormControl, IconButton, InputAdornment,
  MenuItem, Paper, Select, Snackbar, Stack, TextField, Toolbar, Tooltip, Typography
} from '@mui/material';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import StraightenRoundedIcon from '@mui/icons-material/StraightenRounded';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';

const categories = [
  { id: 'longueur', label: 'Longueur', icon: <StraightenRoundedIcon /> },
  { id: 'volume', label: 'Volume', icon: <OpacityRoundedIcon /> },
  { id: 'poids', label: 'Poids', icon: <ScaleRoundedIcon /> },
  { id: 'temperature', label: 'Température', icon: <ThermostatRoundedIcon /> },
  { id: 'temps', label: 'Temps', icon: <AccessTimeRoundedIcon /> }
  { id: 'puissance', label: 'Puissance', icon: <ElectricBoltRoundedIcon /> }
];

const displayNumber = (number) => new Intl.NumberFormat('fr-CA', { maximumFractionDigits: 8 }).format(number);

export default function App() {
  const [units, setUnits] = useState({});
  const [category, setCategory] = useState('longueur');
  const [from, setFrom] = useState('pied');
  const [to, setTo] = useState('metre');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/units').then(r => r.ok ? r.json() : Promise.reject()).then(setUnits)
      .catch(() => setError('Impossible de joindre le serveur. Lancez npm run dev.'));
  }, []);

  const availableUnits = useMemo(() => units[category] || {}, [units, category]);
  const fromUnit = availableUnits[from];
  const toUnit = availableUnits[to];

  const chooseCategory = (id) => {
    const entries = Object.keys(units[id] || {});
    setCategory(id); setFrom(entries[0] || ''); setTo(entries[1] || entries[0] || ''); setResult(null);
  };

  const convert = async () => {
    if (value === '' || !Number.isFinite(Number(value))) { setError('Veuillez saisir un nombre valide.'); return; }
    try {
      const response = await fetch('/api/convert', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category, from, to, value }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data.result);
      setHistory(items => [{ id: Date.now(), text: `${displayNumber(data.value)} ${data.from.symbol} = ${displayNumber(data.result)} ${data.to.symbol}` }, ...items].slice(0, 4));
    } catch (e) { setError(e.message || 'Une erreur est survenue.'); }
  };

  const swapUnits = () => { setFrom(to); setTo(from); setResult(null); };

  return <Box sx={{ minHeight: '100vh' }}>
    <AppBar position="static" elevation={0} color="transparent" sx={{ color: '#18275c', borderBottom: '1px solid #e6e9f4', bgcolor: 'rgba(255,255,255,.85)' }}>
      <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        <Box className="brand-mark">C</Box><Typography variant="h6" fontWeight={800} letterSpacing={-.5}>converti</Typography>
        <Chip label="Convertisseur d'unités" size="small" sx={{ ml: 2, display: { xs: 'none', sm: 'inline-flex' }, bgcolor: '#edf0ff', color: 'primary.main', fontWeight: 600 }} />
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Box textAlign="center" mb={5}><Typography variant="h3" component="h1" fontWeight={800} sx={{ fontSize: { xs: '2.1rem', sm: '3rem' } }}>Convertissez simplement.</Typography><Typography color="text.secondary" mt={1}>Cette page a CLAIREMENT été conçu par moi.</Typography></Box>
      <Paper elevation={0} className="converter-card">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mb={4}>{categories.map(item => <Button key={item.id} startIcon={item.icon} onClick={() => chooseCategory(item.id)} variant={category === item.id ? 'contained' : 'text'} sx={{ flex: 1, py: 1.1, textTransform: 'none', fontWeight: 700 }}>{item.label}</Button>)}</Stack>
        <Typography variant="overline" color="text.secondary" fontWeight={700}>Je veux convertir</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="stretch" mt={1}>
          <TextField fullWidth type="number" value={value} onChange={e => { setValue(e.target.value); setResult(null); }} inputProps={{ step: 'any' }} InputProps={{ endAdornment: <InputAdornment position="end">{fromUnit?.symbol}</InputAdornment> }} />
          <FormControl fullWidth><Select value={from} onChange={e => { setFrom(e.target.value); setResult(null); }}>{Object.entries(availableUnits).map(([id, unit]) => <MenuItem key={id} value={id}>{unit.label} ({unit.symbol})</MenuItem>)}</Select></FormControl>
          <Tooltip title="Inverser les unités"><IconButton color="primary" onClick={swapUnits} sx={{ alignSelf: { xs: 'center', md: 'auto' }, border: '1px solid', borderColor: 'primary.light' }}><SwapHorizRoundedIcon /></IconButton></Tooltip>
          <FormControl fullWidth><Select value={to} onChange={e => { setTo(e.target.value); setResult(null); }}>{Object.entries(availableUnits).map(([id, unit]) => <MenuItem key={id} value={id}>{unit.label} ({unit.symbol})</MenuItem>)}</Select></FormControl>
        </Stack>
        <Button fullWidth variant="contained" size="large" onClick={convert} sx={{ mt: 3, py: 1.4, textTransform: 'none', fontWeight: 800, fontSize: '1rem' }}>Convertir</Button>
        <Box className="result-box" mt={3}>{result === null ? <Typography color="text.secondary">Votre résultat apparaîtra ici</Typography> : <><Typography variant="caption" color="text.secondary" fontWeight={700}>RÉSULTAT</Typography><Typography variant="h3" fontWeight={800}>{displayNumber(result)} <Box component="span" color="primary.main">{toUnit?.symbol}</Box></Typography><Typography color="text.secondary">{value} {fromUnit?.symbol} équivaut à {displayNumber(result)} {toUnit?.symbol}</Typography></>}</Box>
      </Paper>
      {history.length > 0 && <Box mt={4}><Stack direction="row" spacing={1} alignItems="center" mb={1.5}><HistoryRoundedIcon color="action" /><Typography fontWeight={800}>Conversions récentes</Typography></Stack><Paper elevation={0} sx={{ p: 1 }}>{history.map(item => <Box key={item.id} className="history-row">{item.text}</Box>)}</Paper></Box>}
    </Container>
    <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={() => setError('')}><Alert severity="error" onClose={() => setError('')}>{error}</Alert></Snackbar>
  </Box>;
}