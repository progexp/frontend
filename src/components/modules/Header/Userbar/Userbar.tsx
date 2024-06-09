'use client';

import { useRef, useState } from 'react';

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

export default function Userbar() {
    const router = useRouter();

    const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const toggleProfile = () => setIsOpenProfile(!isOpenProfile);
    const closeProfile = () => setIsOpenProfile(false);

    useClickOutside(profileRef, closeProfile);
    useEscapePress(closeProfile);
    useMouseMoveOutside(profileRef, closeProfile, 400);

    const { mutate } = useMutation({
        mutationKey: [AuthMutationKey.Logout],
        mutationFn: () => AuthService.logout(),
        onSuccess: () => router.push('/auth/login')
    });

    return (
        <div
            className={cn(style.userprofile, isOpenProfile && style['userprofile--open'])}
            ref={profileRef}
        >
            <div className={cn(style.userbar)} onClick={toggleProfile}>
                <span className={cn(style.userbar__inner)}>
                    <Image
                        src="http://localhost:4200/static/avatars/mortyhwk.jpg"
                        className={cn(style.userbar__avatar)}
                        alt="Аватар"
                        width={28}
                        height={28}
                    />
                    <div className={cn(style.userbar__username)}>MortyHwk</div>
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
                            <Link href="">
                                <div className={cn(style.menu__user)}>
                                    <Image
                                        src="http://localhost:4200/static/avatars/mortyhwk.jpg"
                                        className={cn(style.user__avatar)}
                                        alt="Аватар"
                                        width={50}
                                        height={50}
                                    />
                                    <div className={cn(style.user__username)}>MortyHwk</div>
                                    <div className={cn(style.user__email)}>
                                        projectx.flex@gmail.com
                                    </div>
                                </div>
                            </Link>
                            <ul className={cn(style.menu__list)}>
                                {USERBAR.map((item, index) => (
                                    <li key={index} className={cn(style.list__item)}>
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
