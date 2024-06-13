'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './styles.sass';
import { Input } from '@/components';
import Image from 'next/image';

type PostPageProps = {
    id: number;
};

export default function Page({ params }: PostPageProps) {
    const [message, setMessage] = useState('');

    const MESSAGES = [
        {
            id: 0,
            author: 'Администрация ProgExp',
            text: 'Добро пожаловать в нашу систему ProgExp! Поздравляем Вас с успешной регистрацией'
        },
        {
            id: 1,
            author: 'Администрация ProgExp',
            text: 'Можем предложить вам различные услуги: например, подписка на наши сервисы всего лишь за 299 р.'
        }
    ];

    return (
        <motion.div
            className="messages-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="messages">
                <div className="title">
                    <span className="text">Администрация ProgExp</span>
                </div>
                <ul className="messages-list">
                    {MESSAGES.map((message, index) => (
                        <Link href={`${message.id}`} key={index}>
                            <li
                                className={`message ${
                                    message.author !== 'Степан Захаров' ? 'left' : 'right'
                                }`}
                            >
                                <Image
                                    className="avatar"
                                    src={'http://localhost:4200/static/avatars/mortyhwk.jpg'}
                                    alt="Аватар"
                                    width={35}
                                    height={35}
                                />
                                <div className="personal-message">
                                    <div className="name">{message.author}</div>
                                    <div className="preview">{message.text}</div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div style={{ height: '50px' }}>
                    <Input
                        value={message}
                        setValue={setMessage}
                        placeholder={'Напишите сообщение...'}
                    />
                </div>
                {/*<Input  />*/}
            </div>
        </motion.div>
    );
}
