# Projet 1 ENT
(Forked du Lab 3 fait avec Maxim)

## Noms des membres de l'équipe;
- David Fortier

## Courte description de l'application;
L'application permet d'effectuer la conversion des mesures de différents modèles. Les modèles disponibles sont la distance, le volume, le poids, la température, le temps et la puissance.

## Lien vers le dépôt GitHub;
(https://github.com/AceFinka/projet1-ent)

## Nom de domaine et le lien HTTPS;
acefinka-project1-app
(https://acefinka-project1-app.duckdns.org/)

## Système d'exploitation et les caractéristiques principales de la VM;
- Ubuntu 22.04 LTS en x64
- Sur B2ats_v2
- 2 vCPU
- 1 Go RAM
- 30 Go SSD

## Courte liste des installations et configurations importantes;
- Ports SSH, HTTP et HTTPS ouverts
- DNS DuckDNS utilisant l'IP de la VM d'Azure
- NGINX
- Certificat SSL
- Option B avec /health
- Setup GitHub actions pour déploiement automatique

## Lien ou la preuve d'une exécution réussie de GitHub Actions;
- Déploiement initial : (https://github.com/AceFinka/projet1-ent/actions/runs/35824020514)
- Update par commit : (https://github.com/AceFinka/projet1-ent/actions/runs/35824397414)

## Résultats des principaux tests effectués;
- Connexion SSH réussie
- Connexion par navigateur internet (HTTP) réussie
- Redirection de HTTP vers HTTPS réussie
- Fonctionnement de l'application réussi
- Update automatique de l'app par commit sur le main réussie
- Redémarrage automatique de l'application par redémarrage de la VM réussi

## Tâche au choix et son résultat;
B (/health) réussie, juste ajouter /health à la fin de l'url

## Courte répartition du travail entre les membres
haha elle est bonne :\]
