import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/layouts/page-layout';
import { Theend } from '@/types/theend';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Step2Props {
    theend: Theend;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function Step2({ theend }: Step2Props) {
    const { data, setData, post, errors } = useForm({
        title: theend.title || '',
        content: theend.content || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/exprimer-vous/step2/${theend.slug}`);
    };

    return (
        <PageLayout>
            <motion.div className="mx-auto max-w-4xl p-6" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="mb-8 text-center" variants={itemVariants}>
                    <img src="/step2.jpg" alt="Raconte ton histoire" className="mx-auto mb-6 h-64 w-auto rounded-lg object-cover shadow-md" />
                    <h1 className="text-3xl font-bold">Raconte-nous ton histoire</h1>
                    <p className="text-muted-foreground mt-2">Exprime-toi avec tes propres mots</p>
                </motion.div>

                <motion.form onSubmit={handleSubmit} className="space-y-10" variants={containerVariants}>
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <h2 className="text-xl font-semibold">Donne un titre à ton histoire</h2>
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Un titre accrocheur..."
                            />
                        </div>
                        {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                    </motion.div>

                    <motion.div className="space-y-4" variants={itemVariants}>
                        <h2 className="text-xl font-semibold">Raconte-nous ton histoire</h2>
                        <div className="space-y-2">
                            <Label htmlFor="content">Contenu</Label>
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Je me souviens de ce jour où..."
                                className="min-h-[200px]"
                            />
                        </div>
                        {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
                    </motion.div>

                    <motion.div className="flex justify-between" variants={itemVariants}>
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Précédent
                        </Button>
                        <Button type="submit">Suivant</Button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </PageLayout>
    );
}
