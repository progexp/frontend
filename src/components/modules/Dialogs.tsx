'use client';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import './styles.sass';

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import style from '@/components/modules/Profile/ProfileHeader/styles.module.scss';
import { CUBIC_EASE, TIME } from '@/constants';
import { RootContext } from '@/components/layouts/RootProvider';

export default function Dialogs() {
    const { profile } = useContext(RootContext);
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
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: TIME, ease: CUBIC_EASE }}
        >
            {profile?.login ? (
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
                                        src={'http://31.128.40.46:4200/static/avatars/mortyhwk.jpg'}
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
            ) : (
                <div
                    style={{
                        fontSize: '24px',
                        marginTop: '50px',
                        fontWeight: '500',
                        color: 'white'
                    }}
                >
                    Чтобы пользоваться сообщениями, Вам необходимо авторизоваться
                </div>
            )}
        </motion.div>
    );
}
