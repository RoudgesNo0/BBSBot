# BBSBot
Schul KI- Front -und Backend

## Beschreibung

Dieser Express-basierte Server fungiert als **Proxy**, der eine Anfrage von einem Client entgegennimmt, sie an eine externe API weiterleitet und die Antwort zurückgibt. Der Server nutzt eine JSON-basierte Konfiguration und verarbeitet Fragen zu **Schulordnung** und **Bildungsangeboten**, die in einer lokalen `data.json`-Datei gespeichert sind. Es wird eine externe API abgefragt, um die Antwort auf die Benutzeranfrage zu generieren. Der Server bietet eine einfache API, die in einer Node.js-Umgebung betrieben werden kann.

---

## Aktueller Funktionsumfang

- **Empfangen von Anfragen**: Der Server empfängt **POST-Anfragen** mit einer Nachricht (`message`) als Eingabe.
- **Verarbeitung der Anfrage**: Basierend auf dem Inhalt der Nachricht wird ein entsprechendes `prompt` erstellt, das an die externe API gesendet wird.
- **API-Abfrage**: Der Server stellt eine Anfrage an eine externe API (`API_URL`), um eine Antwort zu generieren.
- **Datenübertragung**: Die Antwort der externen API wird an den Client zurückgegeben.
- **Umgebungsvariablen**: Wichtige Konfigurationsparameter, wie die API-URL, Header-Informationen und der Port, werden über eine `.env`-Datei geladen, um die Anwendung flexibler und sicherer zu gestalten.

---

## Funktionalitäten zur Verarbeitung von Schulordnung und Bildungsangeboten

### Schulordnung

Der Server prüft, ob die Frage des Benutzers etwas mit der **Schulordnung** zu tun hat und gibt eine entsprechende Regel aus der `data.json`-Datei zurück.

### Bildungsangebote

Der Server prüft, ob die Frage mit den angebotenen **Bildungsgängen** übereinstimmt und gibt Details zu einem Beruf oder Bildungsangebot zurück.

---

## Geplante Erweiterungen

- **Erweiterte Fehlerbehandlung**: Weitere detaillierte Fehlerbehandlung und Logging für bessere Fehlersuche.
- **Testabdeckung**: **Unit- und Integrationstests** hinzufügen, um die Funktionalität des Servers zu validieren.
- **Optimierung der Anfrage-Datenstruktur**: Verbesserung der Art und Weise, wie Daten an die externe API übermittelt werden, um die Anfrage noch flexibler zu gestalten.
- **API-Authentifizierung**: Einfügen von **Authentifizierungsmechanismen** für den sicheren Zugriff auf den Server und die API.
