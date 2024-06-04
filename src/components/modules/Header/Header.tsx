'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useState } from 'react';
import { Input, LoginForm, RegisterForm, Userbar } from '@/components';

import Link from 'next/link';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import { CUBIC_EASE, TIME } from '@/constants';

import { InputIcons } from '@/enums';

export default function Header() {
    const [search, setSearch] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <>
            <AnimatePresence>
                {modal && (isLogin ? <LoginForm /> : <RegisterForm />)}
            </AnimatePresence>
            <AnimatePresence>
                <motion.header
                    className={cn(style.header)}
                    initial={{
                        opacity: 0,
                        height: 0
                    }}
                    animate={{
                        opacity: 1,
                        height: 'auto'
                    }}
                    exit={{
                        opacity: 0,
                        height: 0
                    }}
                    transition={{ duration: TIME, ease: CUBIC_EASE }}
                >
                    <div className={cn(style.header__inner)}>
                        <AnimatePresence>
                            <Link href="/">
                                <motion.div
                                    initial={{
                                        scale: 0
                                    }}
                                    animate={{
                                        scale: 1
                                    }}
                                    exit={{
                                        scale: 0
                                    }}
                                    transition={{ duration: TIME, ease: CUBIC_EASE }}
                                >
                                    <div className={cn(style.header__logotype)}>
                                        <Image
                                            src="/logotype.svg"
                                            alt="Логотип"
                                            width={26}
                                            height={21}
                                            draggable={false}
                                            className={cn(style.logotype__icon)}
                                        />
                                        <span className={cn(style.logotype__text)}>Prog</span>
                                        <span
                                            className={cn(
                                                style.logotype__text,
                                                style['logotype__text--primary']
                                            )}
                                        >
                                            Exp
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        </AnimatePresence>
                        <div className={cn(style['header__search-field'])}>
                            <Input
                                value={search}
                                setValue={setSearch}
                                placeholder="Поиск..."
                                icon={InputIcons.Search}
                            />
                        </div>
                        {/*<Userbar />*/}
                        <div className={cn(style.header__registration)}>
                            <p
                                className={cn(style.registration__text)}
                                onClick={() => {
                                    setModal(true);
                                    setIsLogin(false);
                                }}
                            >
                                Создать аккаунт
                            </p>
                            <p
                                className={cn(style.registration__text)}
                                onClick={() => {
                                    setModal(true);
                                    setIsLogin(true);
                                }}
                            >
                                Войти
                            </p>
                        </div>
                    </div>
                </motion.header>
            </AnimatePresence>
        </>
    );
}
