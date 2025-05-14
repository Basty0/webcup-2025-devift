<x-mail::message :greeting="'Bonjour ' . $name . '!'">

    <p>Nous sommes ravis de vous accueillir sur notre plateforme.</p>

    <x-mail::panel type="info" icon="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/info.svg">
        Cette notification contient des informations importantes concernant votre compte.
    </x-mail::panel>

    ## Votre compte a été créé avec succès!

    <div class="badge">Nouveau Compte</div>

    Vous pouvez maintenant profiter de tous les avantages de notre service. Voici quelques informations pour vous aider
    à démarrer:

    <x-mail::button :url="route('dashboard')" color="primary"
        icon="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/dashboard.svg">
        Accéder à votre tableau de bord
    </x-mail::button>

    ### Vos avantages:

    <div style="display: flex; align-items: center; margin: 10px 0;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/checkmark.svg" width="16" height="16"
            style="margin-right: 10px;">
        <p style="margin: 0;">Accès illimité à toutes les fonctionnalités</p>
    </div>

    <div style="display: flex; align-items: center; margin: 10px 0;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/checkmark.svg" width="16" height="16"
            style="margin-right: 10px;">
        <p style="margin: 0;">Support premium 24/7</p>
    </div>

    <div style="display: flex; align-items: center; margin: 10px 0;">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/checkmark.svg" width="16" height="16"
            style="margin-right: 10px;">
        <p style="margin: 0;">Synchronisation sur tous vos appareils</p>
    </div>

    <div class="divider"></div>

    <x-mail::panel type="success" icon="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/star.svg">
        Prochaine étape: Complétez votre profil pour personnaliser votre expérience!
    </x-mail::panel>

    <x-mail::subcopy>
        Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse support@votreapp.com
    </x-mail::subcopy>
</x-mail::message>
