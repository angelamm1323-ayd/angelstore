<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    const socialMedia = [
        {
            name: "WhatsApp",
            url: "https://www.whatsapp.com/catalog/573146608596",
            icon: "fab fa-whatsapp",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/_angelstore.col/",
            icon: "fab fa-instagram",
        },
        {
            name: "TikTok",
            url: "https://www.tiktok.com/@angelstore.col",
            icon: "fab fa-tiktok",
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61577089975240&mibextid=wwXIfr&rdid=gXekY2YW3gmfEvaA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14EZQveNS6L%2F%3Fmibextid%3DwwXIfr#",
            icon: "fab fa-facebook",
        },
    ];
</script>

<main class="min-h-screen bg-linear-to-br from-pink-50 via-white to-pink-100">
    <!-- Hero Section -->
    <section class="relative py-16 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div
                class="absolute -bottom-10 -left-10 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            ></div>
            <div
                class="absolute -top-10 -right-10 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <h1
                class="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-pink-600 via-pink-500 to-pink-400"
            >
                Contáctanos
            </h1>
            <p class="text-xl text-pink-700 font-medium mb-6 max-w-2xl mx-auto">
                Estamos aquí para ayudarte. ¡Visítanos o escríbenos!
            </p>
        </div>
    </section>

    <!-- Contact Info Section -->
    <section class="py-10">
        <div class="container mx-auto px-4">
            <div
                class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <!-- Contact Info -->
                <div
                    class="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-pink-100"
                    in:fly={{ x: -50, duration: 800, easing: quintOut }}
                >
                    <h2 class="text-3xl font-black mb-6 text-pink-900">
                        Información de Contacto
                    </h2>

                    <div class="space-y-6">
                        <!-- Ubicación -->
                        <div class="flex items-start gap-4">
                            <div
                                class="bg-linear-to-br from-pink-500 to-pink-600 p-3 rounded-xl shrink-0 shadow-md"
                            >
                                <i
                                    class="fas fa-map-marker-alt text-2xl text-white"
                                ></i>
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-bold mb-2 text-pink-900"
                                >
                                    Ubicación
                                </h3>
                                <p class="text-pink-700 font-medium mb-1">
                                    Pasto, Nariño
                                </p>
                                <p class="text-pink-600 mb-3">
                                    Cra 23 #14-38 / Calle del Colorado
                                </p>
                                <a
                                    href="https://maps.google.com?q=Pasto,Nariño,Cra 23 #14-38"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 font-medium text-base group transition-colors"
                                >
                                    Ver en mapa
                                    <i
                                        class="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"
                                    ></i>
                                </a>
                            </div>
                        </div>

                        <!-- Teléfono -->
                        <div class="flex items-start gap-4">
                            <div
                                class="bg-linear-to-br from-pink-500 to-pink-600 p-3 rounded-xl shrink-0 shadow-md"
                            >
                                <i class="fas fa-phone-alt text-2xl text-white"
                                ></i>
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-bold mb-2 text-pink-900"
                                >
                                    Teléfono
                                </h3>
                                <a
                                    href="tel:+573146608596"
                                    class="text-3xl font-black text-pink-600 hover:text-pink-700 transition-colors block mb-1"
                                >
                                    +57 314 6608596
                                </a>
                                <p class="text-pink-500">
                                    Llámanos para más información
                                </p>
                            </div>
                        </div>

                        <!-- Horario -->
                        <div class="flex items-start gap-4">
                            <div
                                class="bg-linear-to-br from-pink-500 to-pink-600 p-3 rounded-xl shrink-0 shadow-md"
                            >
                                <i class="far fa-clock text-2xl text-white"></i>
                            </div>
                            <div class="flex-1">
                                <h3
                                    class="text-xl font-bold mb-3 text-pink-900"
                                >
                                    Horario de Atención
                                </h3>
                                <div class="space-y-2">
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <span class="text-pink-800 font-medium"
                                            >Lunes a Sábado:</span
                                        >
                                        <span class="text-pink-900 font-bold"
                                            >9:00 AM - 7:00 PM</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <span class="text-pink-700 font-medium"
                                            >Domingos y Festivos:</span
                                        >
                                        <span class="text-pink-800 font-bold"
                                            >10:00 AM - 4:00 PM</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Redes Sociales -->
                        <div class="pt-6 border-t border-pink-100">
                            <h3 class="text-xl font-bold mb-4 text-pink-900">
                                Síguenos en Redes Sociales
                            </h3>
                            <div class="flex gap-3 flex-wrap">
                                {#each socialMedia as social}
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Síguenos en ${social.name}`}
                                        class="w-14 h-14 bg-linear-to-br from-pink-100 to-pink-50 hover:from-pink-500 hover:to-pink-600 rounded-xl flex items-center justify-center text-xl text-pink-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shadow-sm"
                                    >
                                        <i class={social.icon}></i>
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map -->
                <div
                    class="bg-white rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px] border border-pink-100"
                    in:fly={{ x: 50, duration: 800, easing: quintOut }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.92532938962!2d-77.28248876306532!3d1.2122514167522997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed483671749ed%3A0x969dd879fabb652d!2sCra.%2023%20%23%2014-38%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses-419!2sco!4v1762736559821!5m2!1ses-419!2sco"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Mapa de Angel Store"
                    ></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Contact Options -->
    <section class="py-20 bg-linear-to-b from-white to-pink-50">
        <div class="container mx-auto px-4">
            <h2
                class="text-5xl font-black mb-16 text-center bg-clip-text text-transparent bg-linear-to-r from-pink-600 via-pink-500 to-pink-400"
            >
                Formas de Contactarnos
            </h2>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
                {#each socialMedia as social, i}
                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ir a ${social.name}`}
                        class="group bg-white hover:bg-linear-to-br hover:from-pink-500 hover:to-pink-600 p-6 rounded-2xl border-2 border-pink-200 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                        in:fly={{
                            y: 50,
                            duration: 500,
                            delay: i * 100,
                            easing: quintOut,
                        }}
                    >
                        <div
                            class="flex flex-col items-center gap-4 text-center"
                        >
                            <div
                                class="bg-linear-to-br from-pink-100 to-pink-200 group-hover:from-white group-hover:to-white w-16 h-16 rounded-2xl flex items-center justify-center transition-colors shadow-md"
                            >
                                <i
                                    class="{social.icon} text-3xl text-pink-600 group-hover:text-pink-600"
                                ></i>
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-black mb-1 text-pink-900 group-hover:text-white transition-colors"
                                >
                                    {social.name}
                                </h3>
                                <p
                                    class="text-base text-pink-600 group-hover:text-pink-100 transition-colors font-medium"
                                >
                                    Chatea con nosotros
                                </p>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-linear-to-r from-pink-100 via-pink-50 to-pink-100">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-5xl md:text-6xl font-black mb-6 text-pink-900">
                ¿Tienes alguna pregunta?
            </h2>
            <p
                class="text-2xl mb-12 max-w-2xl mx-auto text-pink-700 font-medium"
            >
                No dudes en contactarnos. Estamos aquí para ayudarte
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                    href="https://wa.me/573146608596"
                    class="bg-linear-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl text-lg"
                >
                    <i class="fab fa-whatsapp text-2xl"></i>
                    Enviar WhatsApp
                </a>
                <a
                    href="tel:+573146608596"
                    class="bg-white border-2 border-pink-600 text-pink-700 hover:bg-pink-600 hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl text-lg"
                >
                    <i class="fas fa-phone-alt text-xl"></i>
                    Llamar Ahora
                </a>
            </div>
        </div>
    </section>
</main>

<style>
    @keyframes blob {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }
</style>
