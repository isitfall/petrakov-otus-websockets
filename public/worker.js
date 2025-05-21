const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('message', (event) => {
    postMessage(event.data);
});

socket.addEventListener('open', () => {
    console.log('Worker connected to WebSocket');
});