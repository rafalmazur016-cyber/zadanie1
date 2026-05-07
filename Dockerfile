# Wykorzystujemy lekką warstwę bazową Alpine z zainstalowanym środowiskiem Node.js
FROM node:20-alpine AS builder

# Katalogu roboczego wewnątrz kontenera
WORKDIR /app

# Optymalizacja cache-a
COPY package*.json ./
RUN npm install --only=production
COPY strona.js .

# Rozpoczynamy od nowej, czystej warstwy bazowej Alpine
FROM node:20-alpine AS production

#OCI (Open Container Initiative)
LABEL org.opencontainers.image.authors="Rafał Mazur"
LABEL org.opencontainers.image.title="Aplikacja Pogodowa "

WORKDIR /app

# Instalacja curl dla testu HEALTHCHECK (bez zapisu cache)
RUN apk add --no-cache curl

# Utworzenie bezpiecznego użytkownika i grupy
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Kopiowanie plików aplikacji z etapu builder
COPY --from=builder --chown=node:node /app /app

# Deklaracja portu
EXPOSE 9090

# Weryfikacja działania (Healthcheck)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:9090/ || exit 1

# Polecenie startowe uruchamiające aplacjie
CMD ["npm", "start"]