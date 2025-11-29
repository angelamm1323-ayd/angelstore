<script>
    import { fade } from "svelte/transition";

    export let open = false;
    export let product = null;
    export let close = () => {};
</script>

{#if open}
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        on:click={close}
        role="dialog"
        aria-modal="true"
        transition:fade
        tabindex="0"
        on:keydown|stopPropagation
    >
        <!-- Contenedor del modal -->
        <div
            class="bg-white shadow-2xl max-w-4xl w-full
           overflow-hidden relative animate-fade-up
           max-h-[90dvh] rounded-xl"
            on:click|stopPropagation
            role="dialog"
            aria-modal="true"
            aria-label="Detalle del producto"
            tabindex="0"
            on:keydown|stopPropagation
        >
            <div class="grid grid-cols-1 md:grid-cols-2 h-full">
                <!-- COLUMNA IZQUIERDA (Imagen) -->
                <div class="relative h-72 md:h-full w-full overflow-hidden">
                    <img
                        src={product.image || "/imagenotfound.jpg"}
                        alt={product.name}
                        class="w-full h-full object-cover"
                        on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
                    />

                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
                    ></div>

                    <!-- Botón cerrar -->
                    <button
                        on:click={close}
                        class="absolute top-4 right-4 bg-white/90 text-pink-700
                       w-10 h-10 rounded-full flex items-center justify-center
                       text-xl shadow hover:bg-white transition"
                    >
                        ✕
                    </button>
                </div>

                <!-- COLUMNA DERECHA (Contenido con scroll) -->
                <div
                    class="flex flex-col justify-center gap-6 p-6 overflow-y-auto max-h-[90dvh] space-y-4"
                >
                    <div class="flex flex-col space-y-2">
                        <h1 class="text-5xl font-bold text-pink-900">
                            {product.name}
                        </h1>

                        {#if product.description}
                            <p class="text-pink-700 text-md leading-relaxed">
                                {product.description}
                            </p>
                        {/if}
                    </div>

                    <!-- TALLAS: lógica según tipo de prenda -->
                    {#if product.clothingType === "top"}
                        {#if Object.values(product.sizes).some((v) => v > 0)}
                            <div>
                                <p class="text-xs text-pink-500">Tallas</p>
                                <p
                                    class="text-xl font-semibold text-pink-700 flex gap-2 flex-wrap"
                                >
                                    {#each Object.entries(product.sizes) as [talla, cantidad]}
                                        {#if cantidad > 0}
                                            <span
                                                class="px-2 py-1 rounded bg-pink-100 text-pink-700 text-sm"
                                            >
                                                {talla.toUpperCase()} ({cantidad})
                                            </span>
                                        {/if}
                                    {/each}
                                </p>
                            </div>
                        {/if}
                    {/if}

                    {#if product.clothingType === "bottom" && product.numericSizes.length > 0}
                        <div>
                            <p class="text-xs text-pink-500">Tallas</p>

                            <div class="flex gap-2 flex-wrap">
                                {#each product.numericSizes as item}
                                    <span
                                        class="px-2 py-1 rounded bg-pink-100 text-pink-700 text-sm"
                                    >
                                        {item.size}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Precio y Stock -->
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-xs text-pink-500">Precio de venta</p>
                            <p class="text-xl font-semibold text-pink-700">
                                ${product.valorVenta}
                            </p>
                        </div>

                        <div class="text-right">
                            <p class="text-xs text-pink-500">Stock</p>
                            <p class="text-xl font-semibold text-pink-900">
                                {product.stock}
                            </p>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="grid grid-cols-4 gap-3 pt-4">
                        <a
                            href="https://wa.me/573189746650?text=Hola! Me interesa el producto: {product.name}"
                            target="_blank"
                            class="col-span-3 bg-linear-to-r from-pink-600 to-pink-700
                           text-white py-3 rounded-lg font-semibold text-center
                           shadow hover:from-pink-700 hover:to-pink-800 transition
                           flex items-center justify-center gap-2"
                        >
                            <i class="fab fa-whatsapp text-lg"></i>
                            Consultar por WhatsApp
                        </a>

                        <button
                            title="Agregar al carrito"
                            class="col-span-1 border border-pink-600 text-pink-600 py-3
                           rounded-lg font-semibold shadow hover:bg-pink-600
                           hover:text-white transition flex items-center
                           justify-center text-xl"
                        >
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Animación suave al abrir */
    .animate-fade-up {
        animation: fadeUp 0.25s ease-out;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
