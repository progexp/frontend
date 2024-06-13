'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Button, Checkbox, Input, Modal, type CloseCallbackProps } from '@/components';

import Image from 'next/image';
import { InputTypes } from '@/enums';

import { AuthValidationRegExps, NotificationsManager } from '@shared/systems';
import { AuthMutationKey } from '@/enums';

import { AuthService } from '@/services';
import { RootContext } from '@/components/layouts/RootProvider';

export default function LoginForm({ closeCallback }: CloseCallbackProps) {
    const { setProfile } = useContext(RootContext);

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRememberMe, setIsRememberMe] = useState<boolean>(true);

    function submit() {
        if (login.trim() === '' || password.trim() === '') {
            throw new Error('Все поля обязательны к заполнению');
        }

        if (!AuthValidationRegExps.loginRegExps.AllowedChars.test(login)) {
            throw new Error('Логин должен содержать только латинские символы');
        }

        if (!AuthValidationRegExps.loginRegExps.Length.test(login)) {
            throw new Error('Логин не может быть меньше 3 или больше 20 символов');
        }

        if (!AuthValidationRegExps.passwordRegExps.AllowedChars.test(password)) {
            throw new Error('Пароль должен содержать только латинские символы');
        }

        if (!AuthValidationRegExps.passwordRegExps.Length.test(password)) {
            throw new Error('Пароль не может быть меньше 6 и больше 40 символов');
        }

        return AuthService.tryLogin(login, password, isRememberMe);
    }

    const { mutate } = useMutation({
        mutationKey: [AuthMutationKey.Login],
        mutationFn: () => submit(),
        onError: (error: any) => {
            NotificationsManager.sendError(
                error?.response?.data?.message ? error?.response?.data?.message : error.message
            );
        },
        onSuccess: () => {
            NotificationsManager.sendSuccess('Добро пожаловать в систему ProgExp!');
            window.location.reload();
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
                    <p>Вход в учетную запись</p>
                </div>
                <div className={cn(style.form__content)}>
                    <div className={cn(style.form__inputs)}>
                        <Input value={login} setValue={setLogin} placeholder="Введите свой логин" />
                        <Input
                            value={password}
                            setValue={setPassword}
                            placeholder="Введите свой логин"
                            type={InputTypes.Password}
                        />
                    </div>
                    <div className={cn(style.form__checkboxes)}>
                        <Checkbox isChecked={isRememberMe} setChecked={setIsRememberMe}>
                            Запомнить меня
                        </Checkbox>
                    </div>
                    <div className={cn(style.form__buttons)}>
                        <Button onClick={mutate}>Войти</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
