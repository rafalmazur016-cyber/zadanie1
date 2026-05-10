# Zadanie1

# a. Budowa obrazu
Do zbudowania obrazu użyłem polecenia: docker build -t pogodynka:v2 .
# b. Uruchamianie kontenera
Do uruchomienia kontenera: docker run -d -p 9090:9090 --name pogodynka-app pogodynka:v2
<img width="1334" height="442" alt="image" src="https://github.com/user-attachments/assets/ecb9eca5-5d39-4947-a14b-f54bbc6341d9" />

# c. Sposób uzyskania informacji z logów 
docker logs pogodynka-app
<img width="554" height="118" alt="image" src="https://github.com/user-attachments/assets/90398b29-c481-4bd7-8250-f52d7be7c89a" />

# d. Sprawdzenie ile warst posiada zbudowany obraz 
Rozmiar obrazu to 63.6 MB i użyłem polecenia docker images pogodynka:v2  i ma 7 warstw i użyłem docker history pogodynka:v2 
<img width="892" height="338" alt="image" src="https://github.com/user-attachments/assets/0eb08ead-e49f-4efb-a66d-195729a1ec74" />

<img width="899" height="356" alt="image" src="https://github.com/user-attachments/assets/7149ab9e-2090-4587-a5e3-27d2305a09fa" />


# Sprawdznie przed zadaniem dodtkowym 
Skaner Docker Scout wykazał 0 podatności CRITICAL oraz 2 podatności HIGH. Zidentyfikowane luki stanowią false positives (zagrożenia nieaplikowalne w architekturze aplikacji) i można je bezpiecznie zignorować z poniższych powodów:

curl (CVE-2026-3805): Brak dostępnej poprawki w systemie Alpine (status "not fixed"). W zaprojektowanym kontenerze curl działa w sposób hermetyczny – służy wyłącznie do wewnętrznej weryfikacji stanu usługi (HEALTHCHECK na localhost:9090). Brak przetwarzania zewnętrznych danych oraz brak połączeń z zewnętrznymi serwerami całkowicie eliminuje wektor ataku.

picomatch (CVE-2026-33671): Podatność typu ReDoS (niewydajne wyrażenia regularne) w głębokiej sub-zależności środowiska. Aplikacja przyjmuje zapytania opierające się wyłącznie na z góry zdefiniowanej, statycznej liście lokalizacji. Ponieważ kontener nie ewaluuje żadnych skomplikowanych wzorców dostarczanych przez użytkownika końcowego, złośliwe wyzwolenie tej podatności jest niemożliwe.
 
<img width="660" height="647" alt="image" src="https://github.com/user-attachments/assets/9cdfeaac-e336-4245-9d00-6fbc72a0a357" />

# zadanie dodatkowe
Tworzę nową instancję buildera przy użyciu polecnia docker buildx create --name moj-builder --driver docker-container --use i uruchamimy kontener przy użyciu docker buildx inspect --bootstrap
<img width="1151" height="281" alt="image" src="https://github.com/user-attachments/assets/a6d93966-f097-469c-a20b-a9285461f3a7" />

Do zbudowania obrazu konteera użyłem  docker buildx build --platform linux/amd64,linux/arm64 -t rafmaz008/pogodynka:v2 --cache-from=type=registry,ref=rafmaz008/pogodynka:v2 --cache-to=type=inline --push .
<img width="1353" height="640" alt="image" src="https://github.com/user-attachments/assets/ea6d580d-0b1b-442a-8528-db4cc1858279" />

oraz przy użyciu polecenia docker buildx imagetools inspect rafmaz008/pogodynka:v2 pokazuje ze obraz jest wieloplatformowy
<img width="1315" height="392" alt="image" src="https://github.com/user-attachments/assets/dc556af0-9d58-457b-b22a-5f28884456f2" />

