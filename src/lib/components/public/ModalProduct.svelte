<script>
    import { fade } from "svelte/transition";
    import { onDestroy } from "svelte";

    export let open = false;
    export let product = null;
    export let close = () => {};

    // Bloquear scroll del body cuando el modal está abierto
    $: {
        if (typeof document !== "undefined") {
            if (open) {
                document.documentElement.style.overflow = "hidden";
                document.body.style.overflow = "hidden";
            } else {
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
            }
        }
    }

    // Limpiar al destruir el componente
    onDestroy(() => {
        if (typeof document !== "undefined") {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    });
</script>

{#if open}
    <div
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 overflow-y-auto"
        on:click|self={close}
        on:keydown={(e) => e.key === "Escape" && close()}
        transition:fade
        role="dialog"
        aria-modal="true"
        aria-label="Detalle del producto"
        tabindex="0"
    >
        <div
            class="mx-auto bg-white shadow-2xl max-w-4xl w-full animate-fade-up relative md:py-6 md:px-4 rounded-sm sm:rounded-xl"
            role="document"
        >
            <div class="grid grid-cols-1 md:grid-cols-2">
                <!-- IZQUIERDA -->
                <div
                    class="relative h-72 md:h-full w-full overflow-hidden md:rounded-xl"
                >
                    <img
                        src={product?.image || "/imagenotfound.jpg"}
                        alt={product?.name}
                        class="w-full h-full object-cover"
                        on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
                    />

                    <button
                        on:click={close}
                        aria-label="Cerrar"
                        class="absolute top-4 right-4 bg-white/60 text-pink-700 w-10 h-10 rounded-full
                               flex items-center justify-center text-xl shadow hover:bg-white transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <!-- DERECHA -->
                <div class="flex flex-col h-full p-6">
                    <!-- CONTENIDO SUPERIOR (scroll si hay mucho texto) -->
                    <div
                        class="flex flex-col gap-6 overflow-auto grow pr-2 justify-evenly items-start"
                        role="region"
                        aria-label="Detalles del producto"
                    >
                        <div class="flex flex-col space-y-2">
                            <h1 class="text-2xl font-bold text-pink-900">
                                {product?.name}
                            </h1>

                            {#if product?.description}
                                <p
                                    class="text-pink-700 text-md leading-relaxed"
                                >
                                    {product.description}
                                </p>
                            {/if}
                        </div>

                        <!-- Tallas TOP -->
                        {#if product?.clothingType === "top" && product?.sizes}
                            {#if Object.values(product.sizes).some((v) => v > 0)}
                                <div>
                                    <p class="text-xs text-pink-500">Tallas</p>
                                    <div class="flex gap-2 flex-wrap">
                                        {#each Object.entries(product.sizes) as [talla, cantidad]}
                                            {#if cantidad > 0}
                                                <span
                                                    class="px-2 py-1 rounded bg-pink-100 text-pink-700 text-sm"
                                                >
                                                    {talla.toUpperCase()} ({cantidad})
                                                </span>
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        {/if}

                        <!-- Tallas BOTTOM -->
                        {#if product?.clothingType === "bottom" && product?.numericSizes?.length}
                            <div>
                                <p class="text-xs text-pink-500">Tallas</p>
                                <div class="flex gap-2 flex-wrap">
                                    {#each product.numericSizes as item}
                                        <span
                                            class="px-2 py-1 rounded bg-pink-100 text-pink-700 text-sm"
                                        >
                                            {item.size ?? item.talla ?? item}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <p class="text-xs text-pink-500">
                                    Precio de venta
                                </p>
                                <p class="text-xl font-semibold text-pink-700">
                                    ${product?.valorVenta}
                                </p>
                            </div>

                            <div class="text-right">
                                <p class="text-xs text-pink-500">Stock</p>
                                <p class="text-xl font-semibold text-pink-900">
                                    {product?.stock}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div
                        class="grid grid-cols-4 gap-3 mt-auto border-t border-pink-100 pt-6"
                        role="toolbar"
                        aria-label="Acciones del producto"
                    >
                        <a
                            href="https://wa.me/573189746650?text=Hola! Me interesa el producto: {product?.name}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="col-span-3 bg-linear-to-r from-pink-600 to-pink-700 text-white py-3 rounded-lg
                                   font-semibold text-center shadow hover:from-pink-700 hover:to-pink-800 transition
                                   flex items-center justify-center gap-2 hover:scale-101 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            on:keydown={(e) =>
                                e.key === "Enter" &&
                                (window.location.href = `https://wa.me/573189746650?text=Hola! Me interesa el producto: ${product?.name}`)}
                        >
                            <i class="fab fa-whatsapp text-lg"></i>
                            Consultar por WhatsApp
                        </a>

                        <button
                            class="col-span-1 border border-pink-600 text-pink-600 py-3 rounded-lg font-semibold shadow
                                   hover:bg-pink-600 hover:text-white transition flex items-center justify-center text-xl hover:scale-106
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            aria-label="Agregar al carrito"
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
