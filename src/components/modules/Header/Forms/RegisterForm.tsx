'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useState } from 'react';

import { Button, Input, Modal, type CloseCallbackProps } from '@/components';

import Image from 'next/image';
import { InputTypes } from '@/enums';

import { AuthValidationRegExps, NotificationsManager } from '@shared/systems';
import { AuthMutationKey } from '@/enums';

import { AuthService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function RegisterForm({ closeCallback }: CloseCallbackProps) {
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    function submit() {
        if (
            login.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            passwordConfirm.trim() === ''
        ) {
            throw new Error('Все поля обязательны к заполнению');
        }

        if (!AuthValidationRegExps.loginRegExps.AllowedChars.test(login)) {
            throw new Error('Логин должен содержать только латинские символы');
        }

        if (!AuthValidationRegExps.loginRegExps.Length.test(login)) {
            throw new Error('Логин не может быть меньше 3 или больше 20 символов');
        }

        if (!AuthValidationRegExps.emailRegExps.AllowedChars.test(email)) {
            throw new Error(
                'Электронная почта должна содержать только латинские символы, должна быть по формату: example@mail.ru'
            );
        }

        if (!AuthValidationRegExps.emailRegExps.Length.test(email)) {
            throw new Error('Электронная почта не может быть меньше 5 или больше 25 символов');
        }

        if (
            !AuthValidationRegExps.passwordRegExps.AllowedChars.test(password) ||
            !AuthValidationRegExps.passwordRegExps.AllowedChars.test(passwordConfirm)
        ) {
            throw new Error('Пароль должен содержать только латинские символы');
        }

        if (
            !AuthValidationRegExps.passwordRegExps.Length.test(password) ||
            !AuthValidationRegExps.passwordRegExps.Length.test(passwordConfirm)
        ) {
            throw new Error('Пароль не может быть меньше 6 и больше 40 символов');
        }

        if (password !== passwordConfirm) {
            throw new Error('Введенные пароли отличаются');
        }

        return AuthService.tryRegister(login, email, password, passwordConfirm);
    }

    const { mutate } = useMutation({
        mutationKey: [AuthMutationKey.Register],
        mutationFn: () => submit(),
        onError: (error: any) => {
            NotificationsManager.sendError(
                error?.response?.data?.message ? error?.response?.data?.message : error.message
            );
        },
        onSuccess: () => {
            NotificationsManager.sendSuccess('Добро пожаловать в систему ProgExp!');
        }
    });

    return (
        <Modal closeCallback={closeCallback}>
            <div className={cn(style.modal__form)}>
                <div className={cn(style.form__logotype)}>
                    <div className={cn(style.logotype__img)}>
                        <Image src="/logotype.svg" alt="ProgExp" width={120} height={120} />
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
                        <Button onClick={mutate}>Войти</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
