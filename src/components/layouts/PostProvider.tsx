'use client';

import { createContext, useState } from 'react';
import type { ChildrenProps } from '@/types';

type PostContextType = {
    post: any;
    setPost: (newPost: any) => void;
    isPostEdit: boolean;
    setIsPostEdit: (newValue: boolean) => void;
};

export const PostContext = createContext<PostContextType>();

export default function PostProvider({ children }: ChildrenProps) {
    const [post, setPost] = useState<any>();
    const [isPostEdit, setIsPostEdit] = useState<boolean>(false);

    return (
        <PostContext.Provider value={{ post, setPost, isPostEdit, setIsPostEdit }}>
            {children}
        </PostContext.Provider>
    );
}
