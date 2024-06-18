'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import Link from 'next/link';
import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import { CUBIC_EASE, TIME } from '@/constants';

export default function Footer() {
    return (
        <AnimatePresence>
            <motion.footer
                className={cn(style.footer)}
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
                <div className={cn(style.footer__info)}>
                    <div className={cn(style.info__logotype)}>
                        <Image
                            src="/logotype.svg"
                            alt="Логотип"
                            width={40}
                            height={35}
                            draggable={false}
                            className={cn(style.logotype__icon)}
                        />
                    </div>
                    <div className={cn(style.info__copyright)}>
                        <p className={cn(style.copyright__text)}>ProgExp</p>
                        <p className={cn(style.copyright__text)}>2024 © All rights reserved.</p>
                    </div>
                </div>
                <div className={cn(style.footer_links)}>
                    <Link href="https://vk.com/mortylolik">
                        <Image
                            src="http://31.128.40.46:4200/static/contacts/mortyhwk.jpg"
                            alt="mortyhwk"
                            width={35}
                            height={35}
                            draggable={false}
                            className={cn(style.links__link)}
                        />
                    </Link>
                    <Link href="https://vk.com/kazax_bita">
                        <Image
                            src="http://31.128.40.46:4200/static/contacts/shpekel.jpg"
                            alt="mortyhwk"
                            width={35}
                            height={35}
                            draggable={false}
                            className={cn(style.links__link)}
                        />
                    </Link>
                </div>
            </motion.footer>
        </AnimatePresence>
    );
}
