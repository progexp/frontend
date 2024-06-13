import PostPage from '@/components/templates/PostPage/PostPage';

type PostPageProps = {
    params: {
        id: string;
    };
};

export default function Page({ params }: PostPageProps) {
    return <PostPage id={params.id} />;
}
