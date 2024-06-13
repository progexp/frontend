'use client';

import { ChangeEvent, JSX, MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import style from './style.module.scss';
import { ContentState, convertFromHTML, convertToRaw, Editor, EditorState } from 'draft-js';
import Image from 'next/image';
import { ButtonTypes } from '@/enums';
import { useMutation } from '@tanstack/react-query';
import { axiosClassic } from '@/interceptors';
import draftToHtml from 'draftjs-to-html';
import { NotificationsManager } from '@shared/systems';
import { PostContext } from '@/components/layouts/PostProvider';
import { Button, Input } from '@/components';

type UploadType = {
    clean: string;
    preview: string;
};

export default function EditPostPage(): JSX.Element {
    const { post, setPost, isPostEdit, setIsPostEdit } = useContext(PostContext);

    const [newPost, setNewPost] = useState<any>(post);
    const [uploads, setUploads] = useState<UploadType[]>([]);
    const [editorState, setEditorState] = useState<EditorState>(() => {
        const blocksFromHTML = convertFromHTML(newPost.description);
        return EditorState.createWithContent(
            ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
        );
    });
    const editor = useRef<Editor | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const setTitle = (newTitle: string) => setNewPost((prev) => ({ ...prev, title: newTitle }));

    function checkMaxStackImages(event: MouseEvent<HTMLButtonElement>) {
        if (uploads.length > 2) {
            event.preventDefault();
            NotificationsManager.sendError('Максимальное число изображений к загрузке поста 2');
            return false;
        }
        return true;
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await axiosClassic.post('post/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const correctedPath = uploadResponse.data.replace(/\\/g, '/').replace('public/', '');
            const path = `http://localhost:4200/static/${correctedPath}`;

            setUploads((prev) => [
                ...prev,
                {
                    clean: uploadResponse.data,
                    preview: path
                }
            ]);
        } catch (error) {
            NotificationsManager.sendError('Ошибка при загрузке файла');
        }
    }

    async function updatePost(data: PostDto, editorState: EditorState) {
        if (data.title.length > 20) {
            throw new Error('Заголовок не может быть больше 20 символов');
        }

        if (data.title.length < 6) {
            throw new Error('Заголовок не может быть меньше 6 символов');
        }

        const updatedDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        try {
            const updateResponse = await axiosClassic.put<any>(`post/${data.id}`, {
                title: data.title,
                description: updatedDescription,
                files: uploads.map((upload) => upload.clean)
            });

            return updateResponse.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    const { mutate } = useMutation({
        mutationKey: ['post'],
        mutationFn: async (data: any) => updatePost(data, editorState),
        onError: (error) => {
            NotificationsManager.sendError(error.message);
        },
        onSuccess: (data: any) => {
            setIsPostEdit(false);
            setPost({
                ...data,
                author: newPost.author
            });
            NotificationsManager.sendSuccess('Вы успешно поменяли пост');
        }
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={cn(style['post-edit-page'])}
        >
            <motion.div
                initial={{ opacity: 0, marginTop: '-20%', transform: 'scale(0.5)' }}
                animate={{ opacity: 1, marginTop: 0, transform: 'scale(1)' }}
                exit={{ opacity: 0, marginTop: '-20%', transform: 'scale(0.5)' }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className={cn(style['post-edit-page__inner'])}
            >
                <div className={cn(style.inner__header)}>
                    <p className={cn(style.header__description)}>Редактирование поста</p>
                    <Image
                        src="/cancel.svg"
                        alt="Закрыть"
                        width={50}
                        height={50}
                        className={cn(style['header__close-icon'])}
                        onClick={() => setIsPostEdit(false)}
                    />
                </div>
                <div style={{ height: '70px', width: '100%' }}>
                    <Input
                        value={newPost.title}
                        setValue={setTitle}
                        placeholder="Например: Wi-Fi убивает от рака!"
                    />
                </div>
                <div className={cn(style['inner__editor-description'])}>
                    {/*<Toolbar editorState={editorState} setEditorState={setEditorState} />*/}
                    <div className={cn(style['inner__editor-editor'])}>
                        <Editor
                            placeholder="Напишите то, о чем прямо сейчас думаете!"
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                        />
                    </div>
                </div>
                <div className={cn(style.inner__images)}>
                    {uploads.map((image, index) => (
                        <div key={index} className={cn(style.images__image)}>
                            <Image
                                src={image.preview}
                                alt="Картинка"
                                width={300}
                                height={300}
                                className={cn(style.image__img)}
                            />
                        </div>
                    ))}
                </div>
                <div className={cn(style['inner__image-upload'])}>
                    <Button type={ButtonTypes.Back} onClick={checkMaxStackImages}>
                        <label>
                            Загрузить изображение
                            <input type="file" onChange={handleFileChange} />
                        </label>
                    </Button>
                </div>
                <div className={cn(style.inner__buttons)}>
                    <Button type={ButtonTypes.Back} onClick={() => setIsPostEdit(false)}>
                        Назад
                    </Button>
                    <Button onClick={() => mutate(newPost)}>
                        {selectedFile ? 'Загрузить изображение и сохранить' : 'Сохранить'}
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}
