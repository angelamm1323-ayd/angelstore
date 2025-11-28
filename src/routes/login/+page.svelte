<script>
    import { signIn } from "$lib/js/firebase";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;

    const handleSubmit = async () => {
        if (!email || !password) {
            error = "Por favor ingresa tu correo y contraseña";
            return;
        }

        try {
            isLoading = true;
            error = "";
            await signIn(email, password);
            // Redirect to admin on successful login
            goto("/admin");
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            error = "Error al iniciar sesión. Verifica tus credenciales.";
        } finally {
            isLoading = false;
        }
    };
</script>

<div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-pink-100 p-4"
>
    <div
        class="w-full max-w-md rounded-xl overflow-hidden shadow-xl shadow-pink-200 border border-pink-100 bg-white"
    >
        <!-- Header -->
        <div
            class="bg-linear-to-r from-pink-600 to-pink-500 px-6 py-8 text-center text-white"
        >
            <h1 class="text-3xl font-bold">Iniciar Sesión</h1>
            <p class="mt-2 text-sm text-pink-100/90">
                Accede al panel de administración
            </p>
        </div>

        <!-- Form -->
        <div class="p-8 bg-white relative overflow-hidden">
            <!-- Background Logo -->
            <div class="absolute inset-0 pointer-events-none opacity-5">
                <div
                    class="w-full h-full bg-[url('/logo.svg')] bg-center bg-contain bg-no-repeat"
                ></div>
            </div>
            <div class="relative z-10 space-y-6">
                {#if error}
                    <div
                        class="mb-4 p-3 bg-pink-50 border-l-4 border-pink-400 text-pink-800 rounded-r"
                    >
                        <div class="flex">
                            <div class="flex-0">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                {/if}

                <form on:submit|preventDefault={handleSubmit} class="space-y-5">
                    <div class="space-y-1">
                        <label
                            for="email"
                            class="block text-sm font-medium text-pink-900"
                        >
                            Correo electrónico
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <i class="fas fa-envelope text-pink-300"></i>
                            </div>
                            <input
                                type="email"
                                id="email"
                                bind:value={email}
                                class="block w-full pl-10 pr-3 py-3 bg-white border border-pink-200 rounded-lg text-pink-900 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div class="space-y-1">
                        <div class="flex items-center justify-between">
                            <label
                                for="password"
                                class="block text-sm font-medium text-pink-900"
                            >
                                Contraseña
                            </label>
                        </div>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <i class="fas fa-lock text-pink-300"></i>
                            </div>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                class="block w-full pl-10 pr-3 py-3 bg-white border border-pink-200 rounded-lg text-pink-900 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div class="pt-4">
                        <button
                            type="submit"
                            class="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-pink-200"
                            disabled={isLoading}
                        >
                            {#if isLoading}
                                <i class="fas fa-circle-notch fa-spin mr-2"></i>
                                Iniciando sesión...
                            {:else}
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                Iniciar sesión
                            {/if}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-pink-50 px-6 py-4 border-t border-pink-100">
            <p class="text-sm text-pink-700 mt-4 text-center">
                2025 Angel Store. Todos los derechos reservados
            </p>
        </div>
    </div>
</div>
