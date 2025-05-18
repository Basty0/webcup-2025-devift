import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Resultat from './resultats';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recherche',
        href: '/recherche',
    },
];

export default function ResultatRecherche() {
    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="Rechercher" />

            <Resultat />
        </PageLayout>
    );
}
