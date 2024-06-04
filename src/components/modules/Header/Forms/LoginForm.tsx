'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useState } from 'react';

import { Modal, Input } from '@/components';

import Image from 'next/image';

export default function LoginForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <Modal>
            <div className={cn(style.modal__form)}>
                <div className={cn(style.form__logotype)}>
                    <div className={cn(style.logotype__img)}>
                        <Image src="logotype.svg" alt="ProgExp" width={120} height={120} />
                    </div>
                    <p className={cn(style.logotype__text)}>ProgExp</p>
                </div>
                <div className={cn(style.form__title)}>
                    <p>Авторизация</p>
                </div>
                <div className={cn(style.form__content)}>
                    <div className={cn(style.form__inputs)}>
                        <Input value={login} setValue={setLogin} placeholder="Введите свой логин" />
                        <Input
                            value={password}
                            setValue={setPassword}
                            placeholder="Введите свой логин"
                        />
                    </div>
                    <div className={cn(style.form__buttons)}></div>
                </div>
            </div>
        </Modal>
    );
}
