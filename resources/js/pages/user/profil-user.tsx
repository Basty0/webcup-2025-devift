import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import ProfilePage from './ProfilePage';


export default function ProfilUser({user}: {user: any}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'ProfilUser',
            href: `/profil/${user.id}`,
        },
    ];
    console.log(user);
    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="ProfilUser" />
            <SettingsLayout>
            <ProfilePage />
            </SettingsLayout>
        </PageLayout>
    );
}