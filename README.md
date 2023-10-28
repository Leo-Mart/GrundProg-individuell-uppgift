#Grundläggande Programmering - Individuell Uppgift
Individuell uppgift (G/VG)
Denna uppgift är praktisk och individuell. Lycka till!

Bedömning
IG, G & VG

Om kraven för G inte uppnås bedöms uppgiften med IG.

Krav för G:

Följ instruktionerna i beskrivningen
Formatera koden: Små misstag ignoreras men större fel ger IG (om du blir osäker så kan du fråga läraren)
Använd git för versionshantering
Krav för VG:

Uppnå krav för G
Följ VG instruktioner i beskrivningen
Gör passande commits med beskrivande meddelanden; det ska tydligt framstå vad du har gjort i varje commit
Beskrivning
Du skall i denna uppgift bygga en mini-reddit klon som använder DummyJSON posts för att hämta inlägg. Projektet skall endast bestå av en sida. Följande funktionalitet/delar skall finnas:

Alla inlägg ska visas på sidan
Hämta inlägg från DummyJSON
Varje inlägg skall minst visa en titel, innehållet och tags
En sektion för att skapa nya inlägg. Dessa hanteras bara lokalt och måste inte anroppa API:et.
Det skall gå att välja titel, innehåll och tags
För att nå VG behöver du även implementera:

Möjlighet att "gilla" inlägg. Varje inlägg har en reactions variabel (referera till API:et).
Nu måste varje inlägg också visa antal reaktioner/likes
Spara allt i local storage så att informationen finns kvar även efter man uppdaterar sidan
Alla inlägg ska sparas i local storage. De borde överskriva API:et om de finns sparade
Övrig information:

Det finns inga användare. Man vet inte vem som har skapat ett inlägg.
Det går inte att logga in, eftersom det inte finns några användare.
Du väljer design och tema själv. Det finns inga krav på hur "snygg" sidan skall vara.
Inlämning
Resultatet lämnas in på omniway med en git-länk. Se till att bjuda in läraren om repositoriet är privat.