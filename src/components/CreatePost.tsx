'use client';

import './styles.sass';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { axiosClassic } from '@/interceptors';
import { useMutation } from '@tanstack/react-query';
import { NotificationsManager } from '@shared/systems';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function updatePost(data: PostDto) {
        try {
            const updateResponse = await axiosClassic.post('post', {
                title: title,
                description: description,
                userId: 1,
                imageUrl: 'fds'
            });

            return updateResponse.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const { mutate } = useMutation({
        mutationKey: ['postcreate'],
        mutationFn: async (data: any) => updatePost(data),
        onError: (error) => {
            NotificationsManager.sendError(error.message);
        },
        onSuccess: (data: any) => {
            NotificationsManager.sendSuccess('Вы успешно создали!');
            window.location.replace('/');
        }
    });

    return (
        <div className="create-post">
            <div className="create-post__inner">
                <div style={{ height: '50px', width: '500px' }}>
                    <Input value={title} setValue={setTitle} placeholder="Введите заголовок" />
                </div>
                <div style={{ height: '50px', width: '500px' }}>
                    <Input
                        value={description}
                        setValue={setDescription}
                        placeholder="Введите описание"
                    />
                </div>
                <div style={{ height: '50px', width: '500px' }}>
                    <Button onClick={null}>Загрузить картинку</Button>
                </div>
                <div style={{ height: '50px', width: '500px' }}>
                    <Button onClick={mutate}>Создать пост</Button>
                </div>
            </div>
        </div>
    );
}
