'use client';

import cn from 'classnames';
import style from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosClassic } from '@/interceptors';

export default function Posts() {
    const [posts, setPosts] = useState();

    const { isLoading, error, data } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const response = await axiosClassic.get<any>('users');
            return response.data;
        }
    });

    useEffect(() => {
        if (data) {
            setPosts(data);
        }
    }, [data]);

    return <div></div>;
}
