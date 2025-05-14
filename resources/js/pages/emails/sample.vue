<script setup>
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const form = useForm({
    name: '',
    email: '',
});

const success = ref(false);

const submit = () => {
    form.post(route('email.send-sample'), {
        onSuccess: () => {
            success.value = true;
            form.reset();

            setTimeout(() => {
                success.value = false;
            }, 5000);
        },
    });
};
</script>

<template>
    <AppLayout title="Test d'Email">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">Test d'Email</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
                    <h3 class="mb-4 text-lg font-medium text-gray-900">Envoyer un Email de Test</h3>

                    <div v-if="success" class="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                        Email envoyé avec succès!
                    </div>

                    <form @submit.prevent="submit">
                        <div class="mb-4">
                            <label class="mb-2 block text-sm font-bold text-gray-700" for="name"> Nom </label>
                            <input
                                id="name"
                                v-model="form.name"
                                class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                type="text"
                                placeholder="Entrez votre nom"
                            />
                        </div>

                        <div class="mb-6">
                            <label class="mb-2 block text-sm font-bold text-gray-700" for="email"> Email </label>
                            <input
                                id="email"
                                v-model="form.email"
                                class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                                type="email"
                                placeholder="Entrez votre email"
                                required
                            />
                            <p v-if="form.errors.email" class="text-xs text-red-500 italic">{{ form.errors.email }}</p>
                        </div>

                        <div class="flex items-center justify-between">
                            <button
                                class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                                type="submit"
                                :disabled="form.processing"
                            >
                                Envoyer l'email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
