'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useRef, useState } from 'react';

import { Button, Input, Modal, type CloseCallbackProps } from '@/components';

import Image from 'next/image';
import { InputTypes } from '@/enums';
import { useMutation } from '@tanstack/react-query';
import { axiosClassic } from '@/interceptors';
import { useClickOutside } from '@/hooks';

async function tryRegister(
    login: string,
    email: string,
    password: string,
    passwordConfirm: string
) {
    if (login.length > 20) {
        throw new Error('Логин не может быть больше 20 символов');
    }

    if (login.length < 3) {
        throw new Error('Логин не может быть короче 3 символов');
    }

    if (email.length > 25) {
        throw new Error('Электронная почта не может быть больше 25 символов');
    }

    if (email.length < 5) {
        throw new Error('Электронная почта не может быть короче 5 символов');
    }

    if (password.length > 40 || passwordConfirm.length > 40) {
        throw new Error('Пароль не может быть больше 40 символов');
    }

    if (password.length < 6 || passwordConfirm.length < 6) {
        throw new Error('Пароль не может быть короче 6 символов');
    }

    if (password !== passwordConfirm) {
        throw new Error('Введенные пароли не совпадают');
    }

    try {
        const updateResponse = await axiosClassic.put(`auth`, {
            login: login,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        });

        return updateResponse.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default function Register({ closeCallback }: CloseCallbackProps) {
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    // const { mutate } = useMutation({
    //     mutationKey: ['post'],
    //     mutationFn: async (data: PostDto) => tryRegister(data, editorState),
    //     onError: (error) => {
    //         NotificationsManager.sendError(error.message);
    //     },
    //     onSuccess: (data: PostDto) => {
    //         setIsPostEdit(false);
    //         setPost({
    //             ...data,
    //             author: newPost.author
    //         });
    //         NotificationsManager.sendSuccess('Вы успешно поменяли пост');
    //     }
    // });

    return (
        <Modal closeCallback={closeCallback}>
            <div className={cn(style.modal__form)}>
                <div className={cn(style.form__logotype)}>
                    <div className={cn(style.logotype__img)}>
                        <Image src="logotype.svg" alt="ProgExp" width={120} height={120} />
                    </div>
                    <p className={cn(style.logotype__text)}>ProgExp</p>
                </div>
                <div className={cn(style.form__title)}>
                    <p>Создание новой учетной записи</p>
                </div>
                <div className={cn(style.form__content)}>
                    <div className={cn(style.form__inputs)}>
                        <Input value={login} setValue={setLogin} placeholder="Придумайте логин" />
                        <Input
                            value={email}
                            setValue={setEmail}
                            placeholder="Используйте свой e-mail"
                        />
                        <Input
                            value={password}
                            setValue={setPassword}
                            placeholder="Придумайте пароль"
                            type={InputTypes.Password}
                        />
                        <Input
                            value={passwordConfirm}
                            setValue={setPasswordConfirm}
                            placeholder="Повторите пароль"
                            type={InputTypes.Password}
                        />
                    </div>
                    <div className={cn(style.form__buttons)}>
                        <Button onClick={null}>Войти</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
