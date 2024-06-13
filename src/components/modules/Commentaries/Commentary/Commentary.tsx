'use client';

import cn from 'classnames';
import style from './styles.module.scss';
import type { Commentary } from '@shared/types';
import Image from 'next/image';

type ICommentaryProps = {
    commentary: Commentary;
};

export default function Commentaries({ commentary }: ICommentaryProps) {
    return (
        <div className={cn(style.commentary)}>
            <span className={cn(style.commentary__info)}>
                <p className={cn(style.info__author)}>{commentary.author}</p>
                <p className={cn(style.info__createdAt)}>
                    {new Date(commentary.createdAt).toLocaleString()}
                </p>
            </span>
            <div className={cn(style.commentary__content)}>
                <p className={cn(style.content__text)}>{commentary.text}</p>
            </div>
            <div className={cn(style['commentary__options-info'])}>
                <Image src="/post/like.svg" alt="Нравится" width={18} height={18} />
                <p className={cn(style['options-info__likes'])}>{commentary.likes}</p>
            </div>
        </div>
    );
}
