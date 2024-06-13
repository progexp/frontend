'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { ButtonTypes, StatisticsPages } from '@/enums';
import { Button, StatisticsCommentaries, StatisticsLikes, StatisticsPost } from '@/components';
import { useState } from 'react';
import type { ProfileIdProps } from '@/components/modules/Profile/Statistics/ProfileIdProps';
import { PostsPage } from '@/components/templates/PostsPage';

export default function Statistics({ profileId }: ProfileIdProps) {
    const [page, setPage] = useState<StatisticsPages>(StatisticsPages.Posts);

    return (
        <div className={cn(style.statistics)}>
            <ul className={cn(style.statistics__items)}>
                <li className={cn(style.statistics__item)}>
                    <Button onClick={() => setPage(StatisticsPages.Posts)} type={ButtonTypes.Dark}>
                        Постов: 1
                    </Button>
                </li>
                <li className={cn(style.statistics__item)}>
                    <Button
                        onClick={() => setPage(StatisticsPages.Commentaries)}
                        type={ButtonTypes.Dark}
                    >
                        Комментариев: 0
                    </Button>
                </li>
                <li className={cn(style.statistics__item)}>
                    <Button onClick={() => setPage(StatisticsPages.Likes)} type={ButtonTypes.Dark}>
                        Лайков: 0
                    </Button>
                </li>
            </ul>
            <StatisticsPage page={page} profileId={profileId} />
        </div>
    );
}

type StatisticsPageProps = ProfileIdProps & {
    page: StatisticsPages;
};

function StatisticsPage({ profileId, page }: StatisticsPageProps) {
    switch (page) {
        case StatisticsPages.Posts: {
            return <PostsPage />;
        }

        case StatisticsPages.Commentaries: {
            return (
                <div style={{ color: 'white', fontSize: '20px', padding: '20px' }}>
                    Комментариев нет
                </div>
            );
        }

        case StatisticsPages.Likes: {
            return (
                <div style={{ color: 'white', fontSize: '20px', padding: '20px' }}>Лайков нет</div>
            );
        }
    }
}
