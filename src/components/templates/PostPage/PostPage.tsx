'use client';

import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import style from './styles.module.scss';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { axiosClassic } from '@/interceptors';
import DOMPurify from 'dompurify';
import { Commentaries } from '@/components/modules/Commentaries';
import { WriteCommentary } from '@/components/modules/Commentaries/WriteCommentary';
import { PostContext } from '@/components/layouts/PostProvider';
import { EditPostPage } from '@/components/templates/EditPostPage';
// import type { Commentaries as CommentariesType } from '@shared/types';

type PostPageProps = {
    id: string;
};

export default function PostPage({ id }: PostPageProps) {
    const { post, setPost, isPostEdit, setIsPostEdit } = useContext(PostContext);
    const [commentaries, setCommentaries] = useState<any>([]);

    const {
        isLoading: isLoadingPost,
        error: errorPost,
        data: dataPost
    } = useQuery<PostDto>({
        queryKey: ['post', id],
        queryFn: async () => {
            const response = await axiosClassic.get<any>(`/post/${id}`);

            return response.data;
        }
    });

    useEffect(() => {
        if (dataPost) {
            setPost(dataPost);
        }
    }, [dataPost, setPost]);

    const {
        isLoading: isLoadingCommentaries,
        error: errorCommentaries,
        data: dataCommentaries
    } = useQuery<any>({
        queryKey: ['commentaries', id],
        queryFn: async () => {
            const response = await axiosClassic.get<any>(`/commentaries/post/${id}`);

            return response.data;
        }
    });

    useEffect(() => {
        if (dataCommentaries) {
            console.log(dataCommentaries);
            setCommentaries(dataCommentaries);
        }
    }, [dataCommentaries, setCommentaries]);

    if (isLoadingPost) return <div>Loading...</div>;
    if (errorPost) return <div>{`Error: ${errorPost.message}`}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <>
            <AnimatePresence>{isPostEdit && <EditPostPage />}</AnimatePresence>
            <main className={cn(style.post)}>
                <motion.div
                    initial={{ opacity: 0, transform: 'scale(0.95)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0, transform: 'scale(0.95)' }}
                    transition={{
                        duration: 0.25,
                        ease: [0.23, 1, 0.32, 1]
                    }}
                    className={cn(style.post__post)}
                >
                    <div className={cn(style.post__inner)}>
                        <div className={cn(style.post__info)}>
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
                                    <div className={cn(style['info__timestamp--col'])}>
                                        <p className={cn(style.timestamp__text)}>
                                            {new Date(post.createdAt).toLocaleString()}
                                        </p>
                                        {post.createdAt !== post.updatedAt && (
                                            <p
                                                className={cn(
                                                    style.timestamp__text,
                                                    style['timestamp__text--updated']
                                                )}
                                            >
                                                Изменено:{' '}
                                                {new Date(post.updatedAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Image
                                    src="/post/edit.svg"
                                    alt="Редактировать"
                                    width={24}
                                    height={24}
                                    draggable={false}
                                    className={cn(style['info__edit-icon'])}
                                    onClick={() => setIsPostEdit(true)}
                                />
                            </div>
                            <h2 className={cn(style.post__title)}>{post.title}</h2>
                        </div>
                        <p
                            className={cn(style.post__content)}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post?.description)
                            }}
                        />
                        <div className={cn(style.post__images)} style={{ marginBlock: '20px' }}>
                            <div className={cn(style.images__image)}>
                                <Image
                                    src={
                                        post?.imageUrl !== 'fds'
                                            ? `http://localhost:4200/static/${post.imageUrl}`
                                            : 'http://localhost:4200/static/headers/mortyhwk.jpeg'
                                    }
                                    alt="Картинка"
                                    width={300}
                                    height={300}
                                    className={cn(style.image__img)}
                                />
                            </div>
                        </div>
                    </div>
                    <WriteCommentary />
                    <Commentaries commentaries={commentaries} />
                </motion.div>
            </main>
        </>
    );
}
