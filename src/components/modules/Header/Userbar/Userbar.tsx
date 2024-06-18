'use client';

import { useContext, useRef, useState } from 'react';

import cn from 'classnames';
import style from './styles.module.scss';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { useClickOutside, useEscapePress, useMouseMoveOutside } from '@/hooks';

import Link from 'next/link';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import { CUBIC_EASE, TIME, USERBAR } from '@/constants';

import { AuthMutationKey } from '@/enums';

import { AuthService } from '@/services';
import type { Profile } from '@shared/types';
import { NotificationsManager } from '@shared/systems';

type UserbarProps = {
    profile: Profile;
};

export default function Userbar({ profile }: UserbarProps) {
    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const toggleProfile = () => setIsOpenProfile(!isOpenProfile);
    const closeProfile = () => setIsOpenProfile(false);

    useClickOutside(profileRef, closeProfile);
    useEscapePress(closeProfile);
    useMouseMoveOutside(profileRef, closeProfile, 400);

    const { mutate: mutateLogout } = useMutation({
        mutationKey: [AuthMutationKey.Logout],
        mutationFn: () => AuthService.logout(),
        onError: (error: any) => {
            NotificationsManager.sendError(`Произошла ошибка. Подробнее: ${error.message}`);
        },
        onSuccess: () => {
            window.location.reload();
        }
    });

    function handleClickToMenu(index: number) {
        switch (index) {
            case 4: {
                mutateLogout();
            }
        }
    }

    return (
        <div
            className={cn(style.userprofile, isOpenProfile && style['userprofile--open'])}
            ref={profileRef}
        >
            <div className={cn(style.userbar)} onClick={toggleProfile}>
                <span className={cn(style.userbar__inner)}>
                    <Image
                        src={profile?.avatar || 'http://31.128.40.46:4200/static/avatars/default.jpg'}
                        className={cn(style.userbar__avatar)}
                        alt="Аватар"
                        width={28}
                        height={28}
                    />
                    <div className={cn(style.userbar__username)}>{profile.login}</div>
                    <Image
                        src="/arrows/arrow-bottom.svg"
                        alt="Открыть юзербар"
                        width={15.5}
                        height={15.5}
                    />
                </span>
            </div>
            <AnimatePresence>
                {isOpenProfile && (
                    <motion.div
                        className={cn(style.menu)}
                        initial={{ y: '-100%', opacity: 0, height: 0, transform: 'scale(0.85)' }}
                        animate={{ y: 0, opacity: 1, height: 372, transform: 'scale(1)' }}
                        exit={{ y: '-100%', opacity: 0, height: 0, transform: 'scale(0.85)' }}
                        transition={{ duration: TIME, ease: CUBIC_EASE }}
                    >
                        <div className={cn(style.menu__inner)}>
                            <Link href={`/profile/${profile?.id}`}>
                                <div className={cn(style.menu__user)}>
                                    <Image
                                        src={
                                            profile?.avatar ||
                                            'http://31.128.40.46:4200/static/avatars/default.jpg'
                                        }
                                        className={cn(style.user__avatar)}
                                        alt="Аватар"
                                        width={50}
                                        height={50}
                                    />
                                    <div className={cn(style.user__username)}>{profile.login}</div>
                                    <div className={cn(style.user__email)}>{profile.email}</div>
                                </div>
                            </Link>
                            <ul className={cn(style.menu__list)}>
                                {USERBAR.map((item, index) => (
                                    <li
                                        key={index}
                                        className={cn(style.list__item)}
                                        onClick={() => handleClickToMenu(index)}
                                    >
                                        <span className={cn(style.item__inner)}>
                                            <Image
                                                src={item.icon}
                                                alt={item.alt}
                                                width={22}
                                                height={22}
                                            />
                                            <p className={cn(style.item__text)}>{item.alt}</p>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
