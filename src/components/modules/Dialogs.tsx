'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './styles.sass';

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import style from '@/components/modules/Profile/ProfileHeader/styles.module.scss';

export default function Dialogs() {
    const [dialogs, setDialogs] = useState([]);

    const MESSAGES = [
        {
            id: 0,
            name: 'Администрация ProgExp',
            preview:
                'Добро пожаловать в нашу систему ProgExp! Поздравляем Вас с успешной регистрацией'
        }
    ];

    return (
        <motion.div
            className="dialogs-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="dialogs">
                <div className="title">
                    <span className="text">Личные сообщения</span>
                </div>
                <ul className="dialogs-list">
                    {MESSAGES?.map((dialog, index) => (
                        <Link href={`/messages/${dialog?.id}`} key={index}>
                            <li className="dialog">
                                <Image
                                    className="avatar"
                                    src={'http://localhost:4200/static/avatars/mortyhwk.jpg'}
                                    alt="Аватар"
                                    width={50}
                                    height={50}
                                />
                                <div className="personal-dialog">
                                    <div className="name">{dialog.name}</div>
                                    <div className="preview">{dialog.preview}</div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
