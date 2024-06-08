'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useState } from 'react';

import { Button, Checkbox, Input, Modal, type CloseCallbackProps } from '@/components';

import Image from 'next/image';
import { InputTypes } from '@/enums';

import { AuthValidationRegExps } from '@shared/systems';
import { useMutation } from '@tanstack/react-query';

function tryLogin(login: string, password: string, isRemember: boolean) {}

export default function LoginForm({ closeCallback }: CloseCallbackProps) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRememberMe, setIsRememberMe] = useState<boolean>(true);

    function submit() {
        if (!login || !AuthValidationRegExps.loginRegExps.AllowedChars.test(login)) {
            return new Error();
        }

        if (!login || !AuthValidationRegExps.loginRegExps.Length.test(login)) {
            return new Error();
        }
    }

    // const { mutate } = useMutation({
    //     mutationKey: ['post'],
    //     mutationFn: async (data) => tryRegister(data),
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
                        <Button onClick={null}>Войти</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
