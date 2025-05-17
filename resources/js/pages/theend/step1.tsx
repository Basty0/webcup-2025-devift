import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type } from '@/types/theend';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Step1Props {
    types: Type[];
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

export default function Step1({ types }: Step1Props) {
    const { data, setData, post, errors } = useForm({
        type_id: '',
        tone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/exprimer-vous/step1');
    };

    return (
        <motion.div className="mx-auto max-w-4xl p-6" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="mb-8 text-center" variants={itemVariants}>
                <img
                    src="/images/question-mark.jpg"
                    alt="Qu'est-ce qui se passe?"
                    className="mx-auto mb-6 h-64 w-auto rounded-lg object-cover shadow-md"
                />
                <h1 className="text-3xl font-bold">Qu'est-ce qui se passe?</h1>
                <p className="text-muted-foreground mt-2">Exprime-toi à travers ton histoire</p>
            </motion.div>

            <motion.form onSubmit={handleSubmit} className="space-y-10" variants={containerVariants}>
                <motion.div className="space-y-4" variants={itemVariants}>
                    <h2 className="text-xl font-semibold">Choisis ton type d'histoire</h2>
                    <Select value={data.type_id} onValueChange={(value) => setData('type_id', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionne un type" />
                        </SelectTrigger>
                        <SelectContent>
                            {types.map((type) => (
                                <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.type_id && <p className="text-destructive text-sm">{errors.type_id}</p>}
                </motion.div>

                <motion.div className="space-y-4" variants={itemVariants}>
                    <h2 className="text-xl font-semibold">Quel ton veux-tu donner à ton histoire ?</h2>
                    <RadioGroup
                        value={data.tone}
                        onValueChange={(value) => setData('tone', value)}
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    >
                        <div>
                            <RadioGroupItem value="dramatique" id="dramatique" className="peer sr-only" />
                            <Label
                                htmlFor="dramatique"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😢</span>
                                <span className="mt-2 text-center text-sm font-medium">Dramatique</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="ironique" id="ironique" className="peer sr-only" />
                            <Label
                                htmlFor="ironique"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😏</span>
                                <span className="mt-2 text-center text-sm font-medium">Ironique</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="cringe" id="cringe" className="peer sr-only" />
                            <Label
                                htmlFor="cringe"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😅</span>
                                <span className="mt-2 text-center text-sm font-medium">Cringe</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="classe" id="classe" className="peer sr-only" />
                            <Label
                                htmlFor="classe"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😎</span>
                                <span className="mt-2 text-center text-sm font-medium">Classe</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="happy" id="happy" className="peer sr-only" />
                            <Label
                                htmlFor="happy"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😁</span>
                                <span className="mt-2 text-center text-sm font-medium">Joyeux</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="sad" id="sad" className="peer sr-only" />
                            <Label
                                htmlFor="sad"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😥</span>
                                <span className="mt-2 text-center text-sm font-medium">Triste</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="angry" id="angry" className="peer sr-only" />
                            <Label
                                htmlFor="angry"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😡</span>
                                <span className="mt-2 text-center text-sm font-medium">En colère</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="scared" id="scared" className="peer sr-only" />
                            <Label
                                htmlFor="scared"
                                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4"
                            >
                                <span className="text-2xl">😱</span>
                                <span className="mt-2 text-center text-sm font-medium">Effrayé</span>
                            </Label>
                        </div>
                    </RadioGroup>
                    {errors.tone && <p className="text-destructive mt-2 text-sm">{errors.tone}</p>}
                </motion.div>

                <motion.div className="flex justify-end" variants={itemVariants}>
                    <Button type="submit" size="lg">
                        Suivant
                    </Button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
