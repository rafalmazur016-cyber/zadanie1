# Wykorzystujemy lekką warstwę bazową Alpine z zainstalowanym środowiskiem Node.js
FROM node:22-alpine AS builder

# Katalog roboczy wewnątrz kontenera
WORKDIR /app

# Optymalizacja cache-a
COPY package*.json ./
RUN npm install --only=production
COPY strona.js .

# Rozpoczynamy od nowej, czystej warstwy bazowej Alpine
FROM node:22-alpine AS production

# OCI (Open Container Initiative)
LABEL org.opencontainers.image.authors="Rafał Mazur"
LABEL org.opencontainers.image.title="Aplikacja Pogodowa"

WORKDIR /app

# OPTYMALIZACJA WARSTW: Wymuszamy aktualizację systemu, instalujemy curl 
# i tworzymy bezpiecznego użytkownika - wszystko w JEDNEJ warstwie.
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache curl && \
    addgroup -S appgroup && adduser -S appuser -G appgroup


# Kopiowanie plików aplikacji z etapu builder (z POPRAWNYMI uprawnieniami nowej grupy i użytkownika!)
COPY --from=builder --chown=appuser:appgroup /app /app

# Przełączenie kontenera na nowo utworzonego, bezpiecznego użytkownika
USER appuser

# Deklaracja portu
EXPOSE 9090

# Weryfikacja działania (Healthcheck)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:9090/ || exit 1

# Polecenie startowe uruchamiające aplikację
CMD ["npm", "start"]