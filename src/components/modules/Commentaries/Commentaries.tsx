'use client';

import cn from 'classnames';
import style from './styles.module.scss';
import { Commentary } from '@/components/modules/Commentaries/Commentary';

type ICommentariesProps = {
    commentaries: any;
};

export default function Commentaries({ commentaries }: ICommentariesProps) {
    if (!commentaries || commentaries.length === 0) {
        return null;
    }

    return (
        <div className={cn(style.commentaries)}>
            <p className={cn(style.commentaries__description)}>Комментарии</p>
            <div className={cn(style.commentaries__inner)}>
                {commentaries.map((commentary) => (
                    <Commentary key={commentary.id} commentary={commentary} />
                ))}
            </div>
        </div>
    );
}
