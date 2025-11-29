<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let product;
    export let index;
    export let imgSrc;
    export let formatCurrency;
    export let openModal;
</script>

<article
    class="group relative bg-white rounded-2xl shadow-md hover:shadow-pink-200 border border-pink-100 transition-all duration-500 hover:-translate-y-2 flex flex-col"
    in:fly={{
        y: 50,
        duration: 500,
        delay: index * 50,
        easing: quintOut,
    }}
>
    <!-- Imagen -->
    <div class="relative overflow-hidden bg-pink-50">
        <img
            src={imgSrc(product)}
            alt={product.name}
            class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
        />

        <div
            class="absolute inset-0 bg-linear-to-t from-pink-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        {#if product.stock <= 5}
            <div
                class="absolute top-3 right-3 bg-amber-400 text-pink-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm"
            >
                ¡Últimas unidades!
            </div>
        {/if}
    </div>

    <!-- CONTENIDO -->
    <div class="p-6 flex flex-col flex-1">
        <!-- Título -->
        <h3
            class="text-xl font-bold mb-2 text-pink-900 group-hover:text-pink-700 transition-colors"
        >
            {product.name}
        </h3>

        <!-- Descripción -->
        {#if product.description}
            <p class="text-sm text-pink-700 mb-4 line-clamp-2">
                {product.description}
            </p>
        {/if}

        <!-- Empuja el footer hacia abajo -->
        <div class="flex-1"></div>

        <!-- Precio + Stock -->
        <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-xs text-pink-500">Precio</p>
                <p class="text-2xl font-bold text-pink-700">
                    {formatCurrency(product.valorVenta)}
                </p>
            </div>
            <div class="text-right">
                <p class="text-xs text-pink-500">Stock</p>
                <p class="text-lg font-semibold text-pink-900">
                    {product.stock}
                </p>
            </div>
        </div>

        <!-- Botón siempre abajo -->
        <button
            on:click={() => openModal(product)}
            class="block w-full bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-600 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center shadow-sm hover:shadow-pink-200 cursor-pointer"
        >
            <span>Ver más</span>
        </button>
        <!-- <a
            href="https://wa.me/573189746650?text=Hola! Me interesa el producto: {product.name}"
            class="block w-full bg-linear-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center shadow-sm hover:shadow-pink-200"
        >
            <i class="fab fa-whatsapp mr-2"></i>
            Consultar
        </a> -->
    </div>
</article>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
