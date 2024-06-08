'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { type InputIcons, InputTypes } from '@/enums';
import { type ChangeEvent, useState } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import { CUBIC_EASE, TIME } from '@/constants';

export type InputProps = {
    label?: string;
    value: string;
    setValue: (value: string) => void;
    type?: InputTypes;
    placeholder: string;
    autoFocus?: boolean;
    icon?: InputIcons;
};

export default function Input({
    label,
    value,
    setValue,
    type = InputTypes.Text,
    placeholder,
    autoFocus,
    icon
}: InputProps) {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    function changeValue(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function resetValue() {
        setValue('');
    }

    return (
        <label className={cn(style.input, icon && style['input--icon'])}>
            {label && <span className={cn(style.input__label)}>{label}</span>}
            {icon && (
                <Image src={icon} alt="" width={15} height={15} className={cn(style.input__icon)} />
            )}
            <input
                className={cn(style.input__input)}
                autoFocus={autoFocus}
                type={type === InputTypes.Text ? 'text' : isShowPassword ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={changeValue}
            />
            {type === InputTypes.Password && (
                <AnimatePresence>
                    <motion.div
                        className={cn(style.input__eye)}
                        onClick={() => setIsShowPassword((prevState) => !prevState)}
                        initial={{
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0
                        }}
                        transition={{ duration: TIME, ease: CUBIC_EASE }}
                    >
                        <div className={cn(style.eye__icon, value && style['eye__icon--cancel'])}>
                            <Image
                                src={`eye/eye-${isShowPassword ? 'show' : 'hide'}.svg`}
                                alt=""
                                width={20}
                                height={20}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
            <AnimatePresence>
                {value && (
                    <div className={cn(style.input__cancel)}>
                        <motion.div
                            className={cn(style.cancel__icon)}
                            onClick={resetValue}
                            initial={{
                                opacity: 0,
                                width: 0
                            }}
                            animate={{
                                opacity: 1,
                                width: '12%'
                            }}
                            exit={{
                                opacity: 0,
                                width: 0
                            }}
                            transition={{ duration: TIME, ease: CUBIC_EASE }}
                        >
                            <Image src="input/cancel.svg" alt="" width={20} height={20} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </label>
    );
}
