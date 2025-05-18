import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ProfilePage from './ProfilePage';

// Import the types from ProfilePage
interface User {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    photo: string | null;
    photo_cover: string | null;
}

interface Theend {
    id: number;
    user_id: number;
    content: string;
    // Add other properties as needed
    created_at: string;
    updated_at: string;
}

interface ProfilUserProps {
    user: User;
    publishedPosts?: Theend[];
    draftPosts?: Theend[];
}

export default function ProfilUser({ user, publishedPosts = [], draftPosts = [] }: ProfilUserProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'ProfilUser',
            href: `/profil`,
        },
    ];
    console.log(user);
    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="ProfilUser" />

            <ProfilePage user={user} publishedPosts={publishedPosts} draftPosts={draftPosts} />
        </PageLayout>
    );
}
