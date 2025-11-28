<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    const values = [
        {
            icon: "fa-star",
            title: "Calidad",
            description:
                "Productos cuidadosamente seleccionados para garantizar la mejor experiencia",
        },
        {
            icon: "fa-heart",
            title: "Pasión",
            description:
                "Amamos lo que hacemos y se refleja en cada prenda que ofrecemos",
        },
        {
            icon: "fa-users",
            title: "Comunidad",
            description:
                "Construimos relaciones duraderas con nuestros clientes",
        },
        {
            icon: "fa-bolt",
            title: "Innovación",
            description: "Siempre buscando las últimas tendencias para ti",
        },
    ];
</script>

<main
    class="min-h-screen bg-linear-to-br from-pink-50 to-pink-100 text-gray-900"
>
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div
                class="absolute top-1/4 -left-20 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            ></div>
            <div
                class="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"
            ></div>
            <div
                class="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <div
                class="inline-block mb-8 overflow-hidden rounded-full"
                in:fly={{ y: -50, duration: 1000, easing: quintOut }}
            >
                <img
                    src="/logo.jpg"
                    alt="Angel Store Logo"
                    class="h-32 w-32 object-cover rounded-full"
                />
            </div>

            <h1
                class="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-800 to-pink-500"
                in:fly={{ y: 50, duration: 1000, delay: 200, easing: quintOut }}
            >
                Sobre Angel Store
            </h1>
            <p
                class="text-xl md:text-2xl text-pink-700 mb-8 max-w-3xl mx-auto leading-relaxed"
                in:fly={{ y: 50, duration: 1000, delay: 400, easing: quintOut }}
            >
                Más que una tienda de ropa, somos un destino de estilo. Desde
                nuestros inicios en Pasto, Nariño, nos hemos dedicado a ofrecer
                prendas que reflejan personalidad y autenticidad.
            </p>
        </div>
    </section>

    <!-- Our Story -->
    <section class="py-20 bg-pink-50">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h2
                    class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-pink-800 to-pink-500"
                >
                    Nuestra Historia
                </h2>

                <div
                    class="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-pink-100"
                >
                    <div class="space-y-6 text-pink-800 leading-relaxed">
                        <p class="text-lg">
                            <span class="text-pink-500 text-4xl mb-4">A</span
                            >ngel Store nació con una visión clara:
                            <span class="text-pink-900 font-semibold"
                                >revolucionar la forma en que las personas
                                experimentan la moda</span
                            >. No solo vendemos ropa, vendemos una actitud, un
                            estilo de vida.
                        </p>

                        <p>
                            En el corazón de <span
                                class="text-pink-700 font-semibold"
                                >Pasto, Nariño</span
                            >, encontramos nuestra inspiración en la diversidad
                            cultural y la pasión de nuestra gente. Cada prenda
                            que ofrecemos ha sido seleccionada pensando en la
                            personalidad única de nuestros clientes.
                        </p>

                        <p>
                            Nuestro compromiso va más allá de las tendencias
                            pasajeras. Nos enfocamos en
                            <span class="text-white font-semibold"
                                >calidad, autenticidad y servicio excepcional</span
                            >. Cada cliente que visita Angel Store no es solo
                            una transacción, es parte de nuestra familia.
                        </p>

                        <div
                            class="bg-pink-50 border-l-4 border-pink-400 p-6 rounded-r-lg mt-8"
                        >
                            <p class="text-xl italic text-pink-800">
                                "Además de venderte ropa, te vendemos estilo"
                            </p>
                            <p class="text-sm text-pink-600 mt-2">
                                - Nuestro lema
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="py-20">
        <div class="container mx-auto px-4">
            <h2
                class="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-pink-800 to-pink-500"
            >
                Nuestros Valores
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each values as value, i}
                    <div
                        class="bg-white hover:bg-pink-50 text-pink-900 font-medium py-6 px-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center gap-2"
                        in:fly={{
                            y: 50,
                            duration: 500,
                            delay: i * 100,
                            easing: quintOut,
                        }}
                    >
                        <div
                            class="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <i class="fas {value.icon} text-4xl text-pink-600"
                            ></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2 text-pink-900">
                            {value.title}
                        </h3>
                        <p class="text-pink-700 text-sm">
                            {value.description}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-pink-50">
        <div class="container mx-auto px-4">
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
                <div class="text-center">
                    <div class="text-5xl font-black text-pink-700 mb-2">
                        100+
                    </div>
                    <p class="text-pink-700">Productos exclusivos</p>
                </div>
                <div class="text-center">
                    <div class="text-5xl font-black text-pink-700 mb-2">
                        500+
                    </div>
                    <p class="text-pink-700">Clientes satisfechos</p>
                </div>
                <div class="text-center">
                    <div class="text-5xl font-black text-pink-700 mb-2">5★</div>
                    <p class="text-pink-700">Calificación promedio</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-linear-to-r from-pink-100 to-pink-200">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-black mb-6 text-pink-900">
                ¿Listo para descubrir tu estilo?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto text-pink-700">
                Visita nuestra tienda o explora nuestro catálogo en línea
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="/catalogo"
                    class="px-8 py-4 bg-white text-pink-700 font-bold rounded-full hover:bg-pink-50 border border-pink-200 transition-colors shadow-sm hover:shadow-md"
                >
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Ver Catálogo
                </a>
                <a
                    href="https://wa.me/573146608596"
                    class="px-8 py-4 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-colors shadow-sm hover:shadow-md"
                >
                    <i class="fab fa-whatsapp mr-2"></i>
                    Contáctanos
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

    .animation-delay-4000 {
        animation-delay: 4s;
    }
</style>
