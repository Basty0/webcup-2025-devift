import ContentFeed from '@/components/defilement/ContentFeed';
import { useIsMobile } from '@/hooks/use-mobile';
import PageLayout from '@/layouts/page-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const isMobile = useIsMobile();

    return (
        <PageLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <ContentFeed isMobile={isMobile} />
        </PageLayout>
    );
}
