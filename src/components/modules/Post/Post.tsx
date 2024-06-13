'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

type PostProps = {
    post: any;
    index: number;
};

export default function Post({ post, index }: PostProps) {
    const [truncatedDescription, setTruncatedDescription] = useState('');

    useEffect(() => {
        const words = post.description.split(' ');
        if (words.length > 100) {
            setTruncatedDescription(words.slice(0, 100).join(' ') + '...');
        } else {
            setTruncatedDescription(post.description);
        }
    }, [post.description]);

    return (
        <motion.div
            initial={{ opacity: 0, transform: 'scale(0.95)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(0.95)' }}
            transition={{
                delay: index / 100,
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1]
            }}
        >
            <Link href={`post/${post.id}`}>
                <article className={cn(style.post)}>
                    <div className={cn(style.post__info)}>
                        <h2 className={cn(style.post__title)}>{post.title}</h2>
                        <div className={cn(style.info__inner)}>
                            <div className={cn(style.info__author)}>
                                <Image
                                    src="/post/user.svg"
                                    alt="Автор"
                                    width={24}
                                    height={24}
                                    draggable={false}
                                />
                                <p className={cn(style.author__text)}>{post.author}</p>
                            </div>
                            <div className={cn(style.info__timestamp)}>
                                <Image
                                    src="/post/calendar.svg"
                                    alt="Дата"
                                    width={24}
                                    height={24}
                                    draggable={false}
                                />
                                <p className={cn(style.timestamp__text)}>
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p
                        className={cn(style.post__content)}
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(truncatedDescription)
                        }}
                    ></p>
                </article>
            </Link>
        </motion.div>
    );
}
