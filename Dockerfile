# Spécification de l'image de base
FROM node:14

# Création d'un répertoire pour le projet
WORKDIR /app

# Copie des fichiers sources dans le répertoire
COPY . .

# Installation des dépendances
RUN npm install

# Commande pour lancer le build et le serveur
RUN npm run build
CMD ["npm", "start"]

# Exposition du port par défaut de Next.js
EXPOSE 3000
