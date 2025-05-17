import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';



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
            <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-4">Profil de {user.name}</h1>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>ID :</strong> {user.id}</p>
                    
                </div>
        </PageLayout>
    );
}