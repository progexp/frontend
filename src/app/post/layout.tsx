import type { ChildrenProps } from '@/types';
import PostProvider from '@/components/layouts/PostProvider';

export default function PostLayout({ children }: ChildrenProps) {
    return <PostProvider>{children}</PostProvider>;
}
