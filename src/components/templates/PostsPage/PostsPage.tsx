'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';
import style from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { axiosClassic } from '@/interceptors';
import Post from '@/components/modules/Post/Post';

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const response = await axiosClassic.get<any[]>('post');
            return response.data;
        }
    });

    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);

    if (isLoading || !posts) return <div>loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <main className={cn(style['posts-page'])}>
            <div className={cn(style.posts__list)}>
                {posts.length > 0 &&
                    posts.map((post, index) => <Post key={index} post={post} index={index} />)}
            </div>
        </main>
    );
}
