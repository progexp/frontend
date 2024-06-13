import Messages from '@/components/modules/Messages';

export default function Page({ params }) {
    return <Messages id={params.id} />;
}
