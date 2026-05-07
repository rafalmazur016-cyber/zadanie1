# Zadanie1

Opis

#a. Budowa obrazu
Do zbudowania obrazu użyłem polecenia: docker build -t pogodynka:v2 .
#b. Uruchamianie kontenera
Do uruchomienia kontenera: docker run -d -p 9090:9090 --name pogodynka-app pogodynka:v2
<img width="1334" height="442" alt="image" src="https://github.com/user-attachments/assets/ecb9eca5-5d39-4947-a14b-f54bbc6341d9" />

c. Sposób uzyskania informacji z logów 
docker logs pogodynka-app
<img width="554" height="118" alt="image" src="https://github.com/user-attachments/assets/90398b29-c481-4bd7-8250-f52d7be7c89a" />

d.Sprawdzenie ile warst posiada zbudowany obraz 
Rozmiar obrazu to 51.7 MB i użyłem polecenia  a ma 8 warstw  
<img width="899" height="356" alt="image" src="https://github.com/user-attachments/assets/7149ab9e-2090-4587-a5e3-27d2305a09fa" />


 
