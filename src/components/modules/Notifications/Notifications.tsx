'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import type { NotificationDto } from '@shared/types';
import { NotificationsManager } from '@shared/systems';
import { NotificationTypes } from '@shared/enums';
import { CUBIC_EASE, TIME } from '@/constants';

export default function Notifications() {
    const [notifications, setNotifications] = useState<NotificationDto[]>([]);

    useEffect(() => {
        const updateNotifications = () => {
            setNotifications([...NotificationsManager.getAll()]);
        };

        NotificationsManager.subscribe(updateNotifications);

        updateNotifications();

        return () => {
            NotificationsManager.unsubscribe(updateNotifications);
        };
    }, []);

    return (
        <div className={cn(style.notifications)}>
            <div className={cn(style.notifications__inner)}>
                <AnimatePresence mode="sync">
                    {notifications?.slice(-3).map((item: NotificationDto) => (
                        <motion.div
                            key={item.id}
                            className={cn(style.notification)}
                            initial={{
                                opacity: 0,
                                height: 0,
                                marginBottom: 0
                            }}
                            animate={{
                                opacity: 1,
                                height: 'auto',
                                marginBottom: '10px'
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                marginBottom: 0
                            }}
                            transition={{ duration: TIME, ease: CUBIC_EASE }}
                        >
                            <div className={cn(style.notification__content)}>
                                <div className={cn(style.content__icon)}>
                                    {item.type === NotificationTypes.Info ? (
                                        <Image
                                            src="/notifications/info.svg"
                                            alt="Уведомление"
                                            width={45}
                                            height={45}
                                        />
                                    ) : item.type === NotificationTypes.Error ? (
                                        <Image
                                            src="/notifications/error.svg"
                                            alt="Ошибка"
                                            width={45}
                                            height={45}
                                        />
                                    ) : item.type === NotificationTypes.Warning ? (
                                        <Image
                                            src="/notifications/warning.svg"
                                            alt="Предупреждение"
                                            width={45}
                                            height={45}
                                        />
                                    ) : (
                                        <Image
                                            src="/notifications/success.svg"
                                            alt="Успешно"
                                            width={45}
                                            height={45}
                                        />
                                    )}
                                </div>
                                <div className={cn(style.content__description)}>
                                    <p className={cn(style.description__title)}>{item.title}</p>
                                    <p className={cn(style.description__text)}>{item.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
