<script>
    import { createEventDispatcher } from "svelte";

    export let products = [];
    export let categories = [];

    const dispatch = createEventDispatcher();

    let openCategories = {};
    let openMenu = null;

    // Group products by category
    $: productsByCategory = (() => {
        const grouped = {};

        // Create groups for all categories
        categories?.forEach((cat) => {
            grouped[cat.docId] = {
                category: cat,
                products: [],
            };
        });

        // Group for uncategorized products
        grouped["sin-categoria"] = {
            category: {
                nombre: "Sin categoría",
                docId: "sin-categoria",
                codigo: "-",
            },
            products: [],
        };

        // Assign products to categories
        products?.forEach((product) => {
            if (product.categoryId && grouped[product.categoryId]) {
                grouped[product.categoryId].products.push(product);
            } else {
                grouped["sin-categoria"].products.push(product);
            }
        });

        return Object.values(grouped).filter(
            (group) => group.products?.length > 0,
        );
    })();

    // Format currency
    const formatCurrency = (n) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(n);

    // Toggle category accordion
    function toggleCategory(id) {
        openCategories[id] = !openCategories[id];
        openCategories = { ...openCategories };
    }

    // Toggle menu
    function toggleMenu(productId) {
        openMenu = openMenu === productId ? null : productId;
    }

    // Handle edit
    function handleEdit(product) {
        dispatch("edit", { product });
        openMenu = null;
    }

    // Handle delete
    function handleDelete(docId) {
        dispatch("delete", { docId });
        openMenu = null;
    }

    // Get image source
    const imgSrc = (p) => (p?.image?.trim() ? p.image : "/imagenotfound.jpg");

    // Find category by ID
    function findCategory(categoryId) {
        return categories?.find((c) => c.docId === categoryId);
    }

    // Initialize open categories
    $: if (categories.length > 0) {
        categories.forEach((cat) => {
            if (openCategories[cat.docId] === undefined) {
                openCategories[cat.docId] = true;
            }
        });
        if (openCategories["sin-categoria"] === undefined) {
            openCategories["sin-categoria"] = true;
        }
    }
</script>

<svelte:window on:click={() => (openMenu = null)} />

<div class="space-y-4">
    {#if products.length === 0}
        <div
            class="bg-white rounded-lg border-2 border-dashed border-pink-200 p-8 text-center"
        >
            <i class="fas fa-tshirt text-4xl text-pink-300 mb-3"></i>
            <p class="text-pink-700">No hay productos registrados</p>
            <p class="text-sm text-pink-500 mb-1">
                Agrega tu primer producto para comenzar
            </p>
        </div>
    {:else}
        {#each productsByCategory as group (group.category.docId)}
            <div
                class="bg-white rounded-lg border border-pink-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col"
            >
                <!-- Category Header -->
                <button
                    class="w-full px-4 py-3 flex items-center justify-between hover:bg-pink-50 transition-colors"
                    on:click={() => toggleCategory(group.category.docId)}
                >
                    <div class="flex items-center gap-3">
                        <i class="fas fa-tag text-pink-500"></i>
                        <span class="text-lg font-semibold">
                            {group.category.nombre}
                        </span>
                        <span
                            class="text-sm text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full"
                        >
                            {group.products.length}
                        </span>
                    </div>
                    <i
                        class="fas fa-chevron-{openCategories[
                            group.category.docId
                        ]
                            ? 'up'
                            : 'down'} text-pink-400 transition-transform duration-200"
                    ></i>
                </button>

                <!-- Products Grid -->
                {#if openCategories[group.category.docId]}
                    <div class="p-4 border-t border-pink-100 bg-pink-50/60">
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {#each group.products as product (product.docId)}
                                <article
                                    class="bg-white rounded-lg shadow-sm overflow-hidden border border-pink-200 hover:shadow-pink-200/80 hover:-translate-y-1 transition-all duration-200"
                                >
                                    <!-- Product Image -->
                                    <div class="relative h-48 w-full">
                                        <img
                                            src={imgSrc(product)}
                                            alt={product.name}
                                            class="w-full h-48 object-cover"
                                            on:error={(e) =>
                                                (e.target.src =
                                                    "/imagenotfound.jpg")}
                                        />
                                    </div>

                                    <!-- Product Content -->
                                    <div class="p-4">
                                        <div
                                            class="flex justify-between items-start mb-2"
                                        >
                                            <h3
                                                class="font-semibold text-lg text-pink-700"
                                            >
                                                {product.name}
                                            </h3>
                                            <div class="relative">
                                                <button
                                                    title="menu"
                                                    class="text-pink-500 hover:text-pink-700 p-1 -mt-1 -mr-1 cursor-pointer rounded-full hover:bg-pink-50"
                                                    on:click|stopPropagation={() =>
                                                        toggleMenu(
                                                            product.docId,
                                                        )}
                                                >
                                                    <i class="fas fa-ellipsis-v"
                                                    ></i>
                                                </button>

                                                {#if openMenu === product.docId}
                                                    <div
                                                        class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-pink-200 z-20 overflow-hidden"
                                                        role="menu"
                                                        tabindex="0"
                                                        aria-label="Opciones del producto"
                                                        on:click|stopPropagation
                                                        on:keydown|stopPropagation
                                                        on:keydown|preventDefault
                                                    >
                                                        <button
                                                            type="button"
                                                            role="menuitem"
                                                            tabindex="0"
                                                            class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 cursor-pointer text-pink-700"
                                                            on:click={() =>
                                                                handleEdit(
                                                                    product,
                                                                )}
                                                        >
                                                            <i
                                                                class="fas fa-edit text-pink-500"
                                                            ></i>
                                                            <span>Editar</span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            role="menuitem"
                                                            tabindex="0"
                                                            class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 cursor-pointer text-red-500 border-t border-pink-100"
                                                            on:click={() =>
                                                                handleDelete(
                                                                    product.docId,
                                                                )}
                                                            on:keydown={(e) =>
                                                                e.key ===
                                                                    "Enter" &&
                                                                handleDelete(
                                                                    product.docId,
                                                                )}
                                                        >
                                                            <i
                                                                class="fas fa-trash-alt text-red-500"
                                                            ></i>
                                                            <span>Eliminar</span
                                                            >
                                                        </button>
                                                    </div>
                                                {/if}
                                            </div>
                                        </div>

                                        {#if product.description}
                                            <p
                                                class="text-sm text-pink-800 line-clamp-2 flex-1"
                                            >
                                                {product.description}
                                            </p>
                                        {/if}

                                        <!-- Category -->
                                        {#if product.categoryId}
                                            {#each [findCategory(product.categoryId)] as category}
                                                {#if category}
                                                    <p
                                                        class="text-xs text-pink-700 mb-3 flex items-center"
                                                    >
                                                        <i
                                                            class="fas fa-tag mr-1"
                                                        ></i>
                                                        {category.nombre}
                                                        {#if category.codigo}
                                                            <span
                                                                class="text-pink-500 ml-1"
                                                                >({category.codigo})</span
                                                            >
                                                        {/if}
                                                    </p>
                                                {/if}
                                            {/each}
                                        {/if}

                                        <!-- Prices -->
                                        <div class="space-y-2 mb-3">
                                            <div
                                                class="flex justify-between items-center"
                                            >
                                                <span
                                                    class="text-sm text-pink-800"
                                                    >Compra:</span
                                                >
                                                <span
                                                    class="text-red-500 font-medium"
                                                >
                                                    {formatCurrency(
                                                        product.valorCompra,
                                                    )}
                                                </span>
                                            </div>
                                            <div
                                                class="flex justify-between items-center"
                                            >
                                                <span
                                                    class="text-sm text-pink-800"
                                                >
                                                    Venta:
                                                </span>
                                                <span
                                                    class="text-green-600 font-medium"
                                                >
                                                    {formatCurrency(
                                                        product.valorVenta,
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Stock and Sizes -->
                                        <div
                                            class="mt-4 flex justify-end gap-2 pt-3 border-t border-pink-100"
                                        >
                                            <div
                                                class="flex flex-col justify-between items-start mb-2"
                                            >
                                                <div
                                                    class="text-sm font-bold text-pink-900"
                                                >
                                                    Stock:
                                                </div>
                                                <div
                                                    class="text-pink-900 font-medium text-sm"
                                                >
                                                    {product.stock} unidades
                                                </div>
                                            </div>

                                            {#if product.clothingType === "top" && product.sizes}
                                                <div
                                                    class="flex flex-wrap gap-1.5 mt-2"
                                                >
                                                    {#each Object.entries(product.sizes).filter(([_, qty]) => qty > 0) as [size, qty]}
                                                        <span
                                                            class="text-xs bg-pink-100 px-2 py-1 rounded border border-pink-200"
                                                        >
                                                            {size.toUpperCase()}:
                                                            {qty}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {:else if product.numericSizes?.length > 0}
                                                <div
                                                    class="flex flex-wrap gap-1.5 mt-2"
                                                >
                                                    {#each product.numericSizes as item}
                                                        <span
                                                            class="text-xs bg-pink-100 px-2 py-1 rounded border border-pink-200"
                                                        >
                                                            T/{item.size}: U/{item.quantity}
                                                        </span>
                                                    {/each}
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </article>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    {/if}
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        display: -webkit-flex;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-clamp: 2;
    }
</style>
