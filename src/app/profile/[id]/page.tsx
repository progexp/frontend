import { Profile } from '@/components';

type ProfileProps = {
    params: {
        id: number;
    };
};

export default function ProfilePage({ params }: ProfileProps) {
    return <Profile id={params.id} />;
}
