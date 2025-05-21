if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}

if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
            alert('Allow ntifications');
        }
    });
} else {
    alert('Your browser doesnt support Notification API');
}

const worker = new Worker('worker.js');

worker.onmessage = function (e) {
    const message = e.data;

    if (Notification.permission === 'granted') {
        new Notification('Новое уведомление', {
            body: message,
            icon: 'https://via.placeholder.com/64'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Новое уведомление', { body: message });
            }
        });
    }

    const p = document.createElement('p');
    p.textContent = `🔔 ${message}`;
    document.body.appendChild(p);
};