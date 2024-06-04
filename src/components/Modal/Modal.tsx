'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { motion } from 'framer-motion';
import { CUBIC_EASE, TIME } from '@/constants';

import type { ChildrenProps } from '@/types';

export type ModalProps = ChildrenProps;

export default function Modal({ children }: ModalProps) {
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
                {children}
            </motion.div>
        </motion.div>
    );
}
