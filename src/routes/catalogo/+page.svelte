<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import ProductCard from "$lib/components/public/ProductCard.svelte";
    import ModalProduct from "$lib/components/public/ModalProduct.svelte";

    let products = [];
    let categories = [];
    let selectedCategory = "all";
    let searchTerm = "";
    let loading = true;
    let modalOpen = false;
    let selectedProduct = null;

    function openModal(product) {
        selectedProduct = product;
        modalOpen = true;
    }

    function closeModal() {
        selectedProduct = null;
        modalOpen = false;
    }

    onMount(async () => {
        try {
            const { collection, getDocs } = await import("firebase/firestore");
            const { db } = await import("$lib/js/firebase.js");

            const [productsSnap, categoriesSnap] = await Promise.all([
                getDocs(collection(db, "products")),
                getDocs(collection(db, "categorias")),
            ]);

            products = productsSnap.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));

            categories = categoriesSnap.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));

            loading = false;
        } catch (error) {
            console.error("Error loading data:", error);
            loading = false;
        }
    });

    $: filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.categoryId === selectedCategory;
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatCurrency = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(n);

    const imgSrc = (p) => (p?.image?.trim() ? p.image : "/imagenotfound.jpg");
</script>

<main
    class="min-h-screen bg-linear-to-br from-pink-50 to-pink-100 text-gray-900"
>
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div
                class="absolute top-1/4 -left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
            ></div>
            <div
                class="absolute top-1/2 -right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <h1
                class="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-pink-800 to-pink-500"
            >
                Nuestro Catálogo
            </h1>
            <p class="text-xl text-pink-700 mb-8 max-w-2xl mx-auto">
                Descubre nuestra exclusiva colección de prendas seleccionadas
                con estilo
            </p>

            <!-- Search Bar -->
            <div class="max-w-2xl mx-auto">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        bind:value={searchTerm}
                        class="w-full px-6 py-4 rounded-full bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500 pl-12 shadow-sm"
                    />
                    <i
                        class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400"
                    ></i>
                </div>
            </div>
        </div>
    </section>

    <!-- Filters Section -->
    <section class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap gap-3 justify-center">
            <button
                class="px-6 py-2 rounded-full border-2 transition-all text-sm md:text-base {selectedCategory ===
                'all'
                    ? 'bg-pink-600 border-pink-600 text-white'
                    : 'border-pink-200 text-pink-700 hover:border-pink-500 hover:text-pink-800 bg-white'}"
                on:click={() => (selectedCategory = "all")}
            >
                Todos ({products.length})
            </button>
            {#each categories as category}
                <button
                    class="px-6 py-2 rounded-full border-2 transition-all text-sm md:text-base {selectedCategory ===
                    category.docId
                        ? 'bg-pink-600 border-pink-600 text-white'
                        : 'border-pink-200 text-pink-700 hover:border-pink-500 hover:text-pink-800 bg-white'}"
                    on:click={() => (selectedCategory = category.docId)}
                >
                    {category.nombre}
                    ({products.filter((p) => p.categoryId === category.docId)
                        .length})
                </button>
            {/each}
        </div>
    </section>

    <!-- Products Grid -->
    <section class="container mx-auto px-4 py-12 pb-20">
        {#if loading}
            <div class="flex justify-center items-center h-64">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
                ></div>
            </div>
        {:else if filteredProducts.length === 0}
            <div class="text-center py-20">
                <i class="fas fa-box-open text-6xl text-pink-300 mb-4"></i>
                <h3 class="text-2xl font-bold mb-2 text-pink-900">
                    No hay productos disponibles
                </h3>
                <p class="text-pink-700">
                    Intenta con otra búsqueda o categoría
                </p>
            </div>
        {:else}
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {#each filteredProducts as product, i (product.docId)}
                    <ProductCard
                        {product}
                        index={i}
                        {imgSrc}
                        {formatCurrency}
                        {openModal}
                    />
                {/each}
                <ModalProduct
                    open={modalOpen}
                    product={selectedProduct}
                    close={closeModal}
                />
            </div>
        {/if}
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
