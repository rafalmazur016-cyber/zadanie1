# Zadanie1

Opis

# a. Budowa obrazu
Do zbudowania obrazu użyłem polecenia: docker build -t pogodynka:v2 .
# b. Uruchamianie kontenera
Do uruchomienia kontenera: docker run -d -p 9090:9090 --name pogodynka-app pogodynka:v2
<img width="1334" height="442" alt="image" src="https://github.com/user-attachments/assets/ecb9eca5-5d39-4947-a14b-f54bbc6341d9" />

# c. Sposób uzyskania informacji z logów 
docker logs pogodynka-app
<img width="554" height="118" alt="image" src="https://github.com/user-attachments/assets/90398b29-c481-4bd7-8250-f52d7be7c89a" />

# d. Sprawdzenie ile warst posiada zbudowany obraz 
Rozmiar obrazu to 51.7 MB i użyłem polecenia docker images pogodynka:v2  i ma 8 warstw i użyłem docker history pogodynka:v2 
<img width="899" height="356" alt="image" src="https://github.com/user-attachments/assets/7149ab9e-2090-4587-a5e3-27d2305a09fa" />


# Sprawdznie przed zadaniem dodtkowym 
Skaner Docker Scout wykazał 0 podatności CRITICAL oraz 2 podatności HIGH. Zidentyfikowane luki stanowią false positives (zagrożenia nieaplikowalne w architekturze aplikacji) i można je bezpiecznie zignorować z poniższych powodów:

curl (CVE-2026-3805): Brak dostępnej poprawki w systemie Alpine (status "not fixed"). W zaprojektowanym kontenerze curl działa w sposób hermetyczny – służy wyłącznie do wewnętrznej weryfikacji stanu usługi (HEALTHCHECK na localhost:9090). Brak przetwarzania zewnętrznych danych oraz brak połączeń z zewnętrznymi serwerami całkowicie eliminuje wektor ataku.

picomatch (CVE-2026-33671): Podatność typu ReDoS (niewydajne wyrażenia regularne) w głębokiej sub-zależności środowiska. Aplikacja przyjmuje zapytania opierające się wyłącznie na z góry zdefiniowanej, statycznej liście lokalizacji. Ponieważ kontener nie ewaluuje żadnych skomplikowanych wzorców dostarczanych przez użytkownika końcowego, złośliwe wyzwolenie tej podatności jest niemożliwe.
 
<img width="660" height="647" alt="image" src="https://github.com/user-attachments/assets/9cdfeaac-e336-4245-9d00-6fbc72a0a357" />
