import axios from 'axios';

const api = axios.create({
    baseURL: 'http://31.128.40.46:4200/api' // Убедитесь, что здесь правильный адрес вашего бэкенда
});

export const getMessagesForUser = async (user: any) => {
    const response = await api.get(`/messages/${user}`);
    return response.data;
};

export const sendMessage = async (message: any) => {
    const response = await api.post('/messages', message);
    return response.data;
};
