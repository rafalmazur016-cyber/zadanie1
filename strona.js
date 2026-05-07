const express = require('express');
const app = express();

const APP_AUTHOR = "Rafał Mazur"; 
const SERVER_PORT = 9090;

const startTime = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
console.log(`Data uruchomienia: ${startTime}`);
console.log(`Autor programu: ${APP_AUTHOR}`);
console.log(`Serwer działa na porcie TCP: ${SERVER_PORT}`);


const locations = {
    "Gdańsk": { lat: 54.3520, lon: 18.6466 },
    "Wrocław": { lat: 51.1078, lon: 17.0385 },
    "Madryt": { lat: 40.4165, lon: -3.7025 },
    "Barcelona": { lat: 41.3887, lon: 2.1589 },
    "Como": { lat: 45.8107, lon: 9.0863 },
    "Rzym": { lat: 41.9028, lon: 12.4964 }
};

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <title>Aplikacja Pogodowa</title>
            <style>
                body { font-family: 'Arial', sans-serif; background-color: #f0f2f5; color: #333; text-align: center; padding: 40px; }
                .box { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
                select, button { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; }
                button { background-color: #007bff; color: white; border: none; cursor: pointer; }
                button:disabled { background-color: #a0c4ff; cursor: not-allowed; }
            </style>
            <script>
                const data = {
                    "PL": ["Gdańsk", "Wrocław"],
                    "ES": ["Madryt", "Barcelona"],
                    "IT": ["Como", "Rzym"]
                };
                function updateCities() {
                    const country = document.getElementById("kraj").value;
                    const cityDropdown = document.getElementById("miasto");
                    const btn = document.getElementById("btn");
                    cityDropdown.innerHTML = '<option value="" disabled selected>-- wybierz miasto --</option>';
                    if (country) {
                        data[country].forEach(c => {
                            cityDropdown.innerHTML += '<option value="' + c + '">' + c + '</option>';
                        });
                        cityDropdown.disabled = false;
                        btn.disabled = false;
                    }
                }
            </script>
        </head>
        <body>
            <div class="box">
                <h2>Sprawdź Pogodę</h2>
                <form action="/pogoda" method="GET">
                    <select id="kraj" name="kraj" onchange="updateCities()">
                        <option value="" disabled selected>-- Wybierz kraj --</option>
                        <option value="PL">Polska</option>
                        <option value="ES">Hiszpania</option>
                        <option value="IT">Włochy</option>
                    </select>
                    <select id="miasto" name="miasto" disabled>
                        <option value="" disabled selected>Najpierw wybierz kraj</option>
                    </select>
                    <button id="btn" type="submit" disabled>Szukaj</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.get('/pogoda', async (req, res) => {
    const miasto = req.query.miasto;
    const geo = locations[miasto];
    
    if (!geo) {
        return res.send('<center><h3>Błąd: Nie znaleziono miasta. <a href="/">Powrót</a></h3></center>');
    }

    try {
        const fetchRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&current_weather=true`);
        const data = await fetchRes.json();
        const w = data.current_weather;

        res.send(`
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <title>Wynik: ${miasto}</title>
                <style>
                    body { font-family: 'Arial', sans-serif; background-color: #f0f2f5; text-align: center; padding: 40px; color: #333; }
                    .box { background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
                    .temp { font-size: 32px; font-weight: bold; color: black; margin: 15px 0; }
                    .info-text { font-size: 16px; margin: 10px 0; }
                    a { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h2>Pogoda: ${miasto}</h2>
                    <div class="temp">${w.temperature} °C</div>
                    
                    <p class="info-text">Prędkość wiatru: <b>${w.windspeed} km/h</b></p>
                    <p class="info-text">Aktualizacja danych: ${w.time.replace('T', ' ')}</p>
                    
                    <a href="/">Wróć do wyszukiwarki</a>
                </div>
            </body>
            </html>
        `);
    } catch (e) {
        res.send('<center><h3>Błąd połączenia z API. <a href="/">Powrót</a></h3></center>');
    }
});

app.listen(SERVER_PORT, '0.0.0.0');
