'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { NotificationsManager } from '@shared/systems';
import { axiosClassic } from '@/interceptors';
import { PostContext } from '@/components/layouts/PostProvider';
import { Button, Input } from '@/components';

export default function WriteCommentary() {
    const { post } = useContext(PostContext);

    const [commentary, setCommentary] = useState<string>('');

    async function sendDto() {
        if (commentary.length > 5000) {
            throw new Error('Слишком большой комментарий');
        }

        try {
            const response = await axiosClassic.post<any>('commentaries', {
                text: commentary,
                authorId: 1,
                postId: post.id
            });

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const { mutate } = useMutation({
        mutationKey: ['commentaries'],
        mutationFn: () => sendDto(),
        onError: (error) => {
            NotificationsManager.sendError(error.message);
        },
        onSuccess: (data: any) => {}
    });

    return (
        <div className={cn(style['write-commentary'])}>
            <Image
                src="http://localhost:4200/static/avatars/mortyhwk.jpg"
                className={cn(style['write-commentary__avatar'])}
                alt="Аватар"
                width={35}
                height={35}
            />
            <div style={{ height: '50px', width: '100%' }}>
                <Input
                    placeholder="Написать комментарий..."
                    value={commentary}
                    setValue={setCommentary}
                />
            </div>
            <div style={{ width: '50px', height: '50px' }}>
                <Button onClick={() => mutate()}>
                    <Image src="/send.svg" alt="Отправить" width={30} height={30} />
                </Button>
            </div>
        </div>
    );
}
