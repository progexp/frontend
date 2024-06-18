// src/services/socket.js
import { io } from 'socket.io-client';

const socket = io('http://31.128.40.46:4200/api', {
    withCredentials: true
});

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

export const sendMessage = (message) => {
    socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback) => {
    socket.on('receiveMessage', callback);
};

export default socket;
