// Funktion zur Vigenère-Entschlüsselung (Reine Rechenbeschleunigung)
function vigenereEntschluesseln(text, schluessel) {
    if (!schluessel) return text; // Ohne Schlüssel bleibt der Text gleich
    
    let klartext = "";
    text = text.toUpperCase();
    schluessel = schluessel.toUpperCase().replace(/[^A-Z]/g, ""); // Nur A-Z im Schlüssel erlauben
    
    if (schluessel.length === 0) return text;
    
    let schluesselIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        
        // Nur Großbuchstaben A-Z manipulieren
        if (code >= 65 && code <= 90) {
            let textShift = code - 65;
            let keyShift = schluessel.charCodeAt(schluesselIndex % schluessel.length) - 65;
            
            // Mathematische Rückverschiebung (Modulo 26)
            let entschluesseltesChar = (textShift - keyShift + 26) % 26;
            klartext += String.fromCharCode(entschluesseltesChar + 65);
            
            schluesselIndex++;
        } else {
            // Leerzeichen, Satzzeichen und Zahlen werden unverändert durchgereicht
            klartext += text[i];
        }
    }
    return klartext;
}

// Aktualisiert die Textstatistiken automatisch bei der Eingabe
function analysiereUndUpdate() {
    const text = document.getElementById("ciphertext").value;
    const reinerText = text.replace(/[^A-Za-z]/g, "");
    document.getElementById("text-stats").textContent = `Länge: ${text.length} Zeichen (reine Buchstaben: ${reinerText.length})`;
    
    // Nach der Textänderung auch die Entschlüsselung updaten
    liveEntschluesseln();
}

// Führt die eigentliche Entschlüsselung in Echtzeit aus
function liveEntschluesseln() {
    const geheimtext = document.getElementById("ciphertext").value;
    const schluessel = document.getElementById("user-key").value;
    const ausgabe = document.getElementById("output");

    if (!geheimtext.trim()) {
        ausgabe.textContent = "Bitte gib zuerst einen Geheimtext ein.";
        return;
    }

    // Das Tool nimmt dem Nutzer das manuelle Rechnen im Alphabet ab
    const ergebnis = vigenereEntschluesseln(geheimtext, schluessel);
    ausgabe.textContent = ergebnis;
}

// Initialer Aufruf beim Laden der Seite
analysiereUndUpdate();
