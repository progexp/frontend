'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { motion } from 'framer-motion';
import { CUBIC_EASE, TIME } from '@/constants';

import type { ChildrenProps } from '@/types';
import type { CloseCallbackProps } from '@/components';
import { useClickOutside } from '@/hooks';
import { useRef } from 'react';
import Image from 'next/image';

export type ModalProps = ChildrenProps & CloseCallbackProps;

export default function Modal({ closeCallback, children }: ModalProps) {
    const formRef = useRef<HTMLDivElement>(null);

    useClickOutside(formRef, closeCallback);

    return (
        <motion.div
            className={cn(style.modal)}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{ duration: TIME, ease: CUBIC_EASE }}
        >
            <motion.div
                className={cn(style.modal__inner)}
                ref={formRef}
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
                <div className={cn(style['modal__close-btn'])}>
                    <div className={cn(style['close-btn__btn'])} onClick={closeCallback}>
                        <Image src="input/cancel.svg" alt="" width={50} height={50} />
                    </div>
                </div>
                {children}
            </motion.div>
        </motion.div>
    );
}
