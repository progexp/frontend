'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import Link from 'next/link';
import type { NavigationType } from '@/types';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { CUBIC_EASE, NAVIGATIONS, TIME } from '@/constants';

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.nav
                className={cn(style['navigation-bar'])}
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
                <ul className={cn(style['navigation-bar__list'])}>
                    {NAVIGATIONS.map((item: NavigationType, index: number) => (
                        <li
                            className={cn(
                                style['navigation-bar__item'],
                                pathname === item.path && style['navigation-bar__item--selected']
                            )}
                            key={index}
                        >
                            <Link href={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </motion.nav>
        </AnimatePresence>
    );
}
