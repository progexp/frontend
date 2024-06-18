'use client';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import './styles.sass';
import { Button, Input } from '@/components';
import Image from 'next/image';
import { CUBIC_EASE, TIME } from '@/constants';
import { getMessagesForUser } from '@/services/messages.service';
import socket, { onMessageReceived, sendMessage } from '@/services/socket';
import { RootContext } from '@/components/layouts/RootProvider';

export default function Page({ id }: any) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const { profile } = useContext(RootContext);

    useEffect(() => {
        const fetchMessages = async () => {
            const messages = await getMessagesForUser(id);
            setMessages(messages);
        };

        fetchMessages();

        const handleMessageReceived = (message) => {
            if (message.sender === profile.id || message.recipient === id) {
                console.log('Message received:', message);
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        socket.off('receiveMessage'); // Отключение предыдущих обработчиков
        onMessageReceived(handleMessageReceived); // Регистрация нового обработчика

        return () => {
            socket.off('receiveMessage', handleMessageReceived); // Очистка при размонтировании компонента
        };
    }, [id, profile.id]);
    const handleSubmit = () => {
        const message = { sender: profile.login, recipient: id, content };
        sendMessage(message);
        setContent('');
    };

    return (
        <motion.div
            className="messages-page"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: TIME, ease: CUBIC_EASE }}
        >
            <div className="messages">
                <div className="title">
                    <span className="text">{id}</span>
                </div>
                <ul className="messages-list">
                    {messages?.map((message, index) => (
                        <Link href={`${message.id}`} key={index}>
                            <li
                                className={`message ${
                                    message.author !== 'Степан Захаров' ? 'left' : 'right'
                                }`}
                            >
                                <Image
                                    className="avatar"
                                    src={'http://31.128.40.46:4200/static/avatars/default.jpg'}
                                    alt="Аватар"
                                    width={35}
                                    height={35}
                                />
                                <div className="personal-message">
                                    <div className="name">{message.sender}</div>
                                    <div className="preview">{message.content}</div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div style={{ height: '50px' }}>
                    <Input
                        value={content}
                        setValue={setContent}
                        placeholder={'Напишите сообщение...'}
                    />
                    <Button onClick={handleSubmit}>Отправить сообщение</Button>
                </div>
                {/*<Input  />*/}
            </div>
        </motion.div>
    );
}
