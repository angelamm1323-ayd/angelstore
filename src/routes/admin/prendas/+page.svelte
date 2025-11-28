<script>
    import ProductCard from "$lib/components/ProductCard.svelte";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { onMount } from "svelte";
    import {
        emptyProduct,
        loadProducts,
        saveProduct,
        deleteProductByDocId,
        getNextProductId,
    } from "$lib/js/productsCrud.js";

    import { loadProviders } from "$lib/js/providersCrud.js";
    import { loadCategories } from "$lib/js/categoriesCrud.js";

    // DATA
    let products = [];
    let providers = [];
    let categories = [];
    let editingDocId = null;
    let product = emptyProduct();
    let newSize = "";
    let newQuantity = "";

    // REACTIVIDAD DEL STOCK
    $: {
        if (product.clothingType === "top") {
            product.stock = Object.values(product.sizes).reduce(
                (acc, v) => acc + (parseInt(v) || 0),
                0,
            );
        } else {
            product.stock = Array.isArray(product.numericSizes)
                ? product.numericSizes.reduce((acc, x) => acc + x.quantity, 0)
                : 0;
        }
    }

    // PREVIEW DE IMAGEN SEGURA
    const previewImage = () =>
        product.image && product.image.trim() !== ""
            ? product.image
            : "/imagenotfound.jpg";
    let preview = "/imagenotfound.jpg";
    $: preview = previewImage();

    onMount(async () => {
        [products, providers, categories] = await Promise.all([
            loadProducts(),
            loadProviders(),
            loadCategories(),
        ]);
    });

    function clearForm() {
        editingDocId = null;
        product = emptyProduct();
        newSize = "";
        newQuantity = "";
    }

    function handleEditProduct(event) {
        const productToEdit = event.detail.product;
        product = JSON.parse(JSON.stringify(productToEdit));
        editingDocId = productToEdit.docId;

        const formElement = document.querySelector("form");
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    function addNumericSize() {
        const size = parseInt(newSize);
        const quantity = parseInt(newQuantity);

        if (!size || size <= 0 || !quantity || quantity <= 0) {
            alert("Ingrese talla y cantidad válidas (mayores a 0).");
            return;
        }

        const existing = product.numericSizes.find((x) => x.size === size);
        if (existing) {
            existing.quantity += quantity;
        } else {
            product.numericSizes = [
                ...product.numericSizes,
                { size, quantity },
            ];
        }

        newSize = "";
        newQuantity = "";
    }

    function removeNumericSize(index) {
        product.numericSizes = product.numericSizes.filter(
            (_, i) => i !== index,
        );
    }

    async function handleSave(e) {
        e.preventDefault();

        try {
            if (!product.id && !editingDocId) {
                product.id = await getNextProductId();
            }

            await saveProduct(product, editingDocId);

            // Recargar la lista de productos
            products = await loadProducts();

            clearForm();

            // Scroll to the list
            const listElement = document.querySelector(
                "section.lg\\:col-span-2",
            );
            if (listElement) {
                listElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } catch (error) {
            console.error("Error saving product:", error);
            alert(
                "Error al guardar el producto. Por favor, inténtalo de nuevo.",
            );
        }
    }

    async function handleDelete(event) {
        const docId = event.detail.docId;

        if (!confirm("¿Estás seguro de que deseas eliminar este producto?"))
            return;

        try {
            await deleteProductByDocId(docId);

            // Actualizar la lista localmente
            products = products.filter((p) => p.docId !== docId);

            if (editingDocId === docId) {
                clearForm();
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert(
                "No se pudo eliminar el producto. Por favor, inténtalo de nuevo.",
            );
        }
    }
</script>

<div class="min-h-screen bg-pink-50 text-pink-900 p-4">
    <div class="max-w-6xl mx-auto space-y-6">
        <!-- HEADER -->
        <header class="flex items-center justify-between">
            <h1 class="text-3xl font-bold flex items-center gap-2">
                <i class="fas fa-cog"></i> Panel de Productos
            </h1>
        </header>

        <!-- GRID GENERAL -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- FORMULARIO -->
            <section
                class="bg-white p-6 rounded-lg border border-pink-200 shadow-sm h-fit"
            >
                <h2 class="text-xl font-semibold mb-4">
                    {editingDocId ? "Editar Producto" : "Agregar Producto"}
                </h2>

                <form on:submit|preventDefault={handleSave} class="space-y-4">
                    <!-- Nombre -->
                    <div>
                        <label
                            for="name"
                            class="text-sm font-medium text-pink-900"
                        >
                            Nombre
                        </label>
                        <input
                            id="name"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.name}
                            required
                        />
                    </div>

                    <!-- Valor compra -->
                    <div>
                        <label
                            for="valorCompra"
                            class="text-sm font-medium text-pink-900"
                        >
                            Valor de compra
                        </label>
                        <input
                            id="valorCompra"
                            type="number"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.valorCompra}
                            required
                        />
                    </div>

                    <!-- Valor venta -->
                    <div>
                        <label
                            for="valorVenta"
                            class="text-sm font-medium text-pink-900"
                        >
                            Valor de venta
                        </label>
                        <input
                            id="valorVenta"
                            type="number"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.valorVenta}
                            required
                        />
                    </div>

                    <!-- Descripción -->
                    <div>
                        <label
                            for="description"
                            class="text-sm font-medium text-pink-900"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            rows="2"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.description}
                        ></textarea>
                    </div>

                    <!-- Proveedor (select) -->
                    <div>
                        <label
                            for="provider"
                            class="text-sm font-medium text-pink-900"
                        >
                            Proveedor
                        </label>
                        <select
                            id="provider"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.providerId}
                        >
                            <option value={null}>Seleccione un proveedor</option
                            >
                            {#each providers as p}
                                <option value={p.docId}>
                                    {p.nombre}
                                </option>
                            {/each}
                        </select>
                    </div>

                    <!-- Categoría -->
                    <div>
                        <label
                            for="category"
                            class="text-sm font-medium text-pink-900"
                        >
                            Categoría
                        </label>
                        <select
                            id="category"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.categoryId}
                        >
                            <option value={null}
                                >Seleccione una categoría</option
                            >
                            {#each categories as cat}
                                <option value={cat.docId}>
                                    {cat.nombre} ({cat.codigo})
                                </option>
                            {/each}
                        </select>
                    </div>

                    <!-- Imagen -->
                    <div>
                        <label
                            for="image"
                            class="text-sm font-medium text-pink-900"
                        >
                            Imagen (URL)
                        </label>
                        <input
                            id="image"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={product.image}
                            placeholder="https://..."
                            on:input={() => (preview = previewImage())}
                        />
                    </div>

                    <!-- Preview -->
                    <div class="flex justify-center">
                        <img
                            src={preview}
                            alt="preview"
                            class="w-28 h-28 md:w-32 md:h-32 object-cover rounded border border-pink-200 bg-pink-50"
                            on:error={(e) => {
                                if (!e.target.dataset.failed) {
                                    e.target.dataset.failed = true;
                                    e.target.src = "/imagenotfound.jpg";
                                }
                            }}
                        />
                    </div>

                    <!-- Tipo de prenda -->
                    <div class="mb-4">
                        <label
                            for="Tipo"
                            class="text-sm font-medium text-pink-900 mb-2 block"
                        >
                            Tipo de prenda
                        </label>
                        <div class="flex space-x-4">
                            <label class="inline-flex items-center">
                                <input
                                    type="radio"
                                    class="form-radio text-indigo-600"
                                    bind:group={product.clothingType}
                                    value="top"
                                />
                                <span class="ml-2">Parte Superior</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input
                                    type="radio"
                                    class="form-radio text-indigo-600"
                                    bind:group={product.clothingType}
                                    value="bottom"
                                />
                                <span class="ml-2">Parte Inferior</span>
                            </label>
                        </div>
                    </div>

                    <!-- Tallas -->
                    <div>
                        <label
                            for="tallas"
                            class="text-sm font-medium text-pink-900 mb-2 block"
                        >
                            {product.clothingType === "top"
                                ? "Tallas (Cantidad por talla)"
                                : "Tallas (Separadas por comas)"}
                        </label>

                        {#if product.clothingType === "top"}
                            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {#each Object.keys(product.sizes) as size}
                                    <div>
                                        <label
                                            class="text-xs text-pink-500"
                                            for="sizes-{size}"
                                        >
                                            {size.toUpperCase()}
                                        </label>
                                        <input
                                            id="sizes-{size}"
                                            type="number"
                                            min="0"
                                            class="w-full px-2 py-1 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                            bind:value={product.sizes[size]}
                                        />
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <div class="space-y-2">
                                <div
                                    class="flex gap-2 flex-wrap sm:flex-nowrap"
                                >
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Talla"
                                        class="w-1/2 sm:w-1/3 px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                        bind:value={newSize}
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Unidades"
                                        class="w-1/2 sm:w-1/3 px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                        bind:value={newQuantity}
                                    />
                                    <button
                                        type="button"
                                        class="px-3 py-2 bg-pink-600 rounded hover:bg-pink-700 text-white flex-1 sm:flex-none"
                                        on:click={addNumericSize}
                                    >
                                        <i class="fas fa-plus mr-1"></i> Agregar
                                    </button>
                                </div>

                                <div class="flex flex-wrap gap-2 mt-1">
                                    {#each product.numericSizes as item, index}
                                        <span
                                            class="text-xs bg-pink-100 px-2 py-1 rounded-md border border-pink-200 flex items-center gap-1"
                                        >
                                            {item.size} — {item.quantity}
                                            <button
                                                aria-label="Eliminar talla"
                                                type="button"
                                                class="ml-1 text-red-500 hover:text-red-600"
                                                on:click={() =>
                                                    removeNumericSize(index)}
                                            >
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </span>
                                    {/each}
                                    {#if product.numericSizes.length === 0}
                                        <span class="text-xs text-pink-500"
                                            >Sin tallas registradas</span
                                        >
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    </div>

                    <!-- Stock total -->
                    <div>
                        <label
                            for="stock"
                            class="text-sm font-medium text-pink-900"
                        >
                            Stock total
                        </label>
                        <input
                            id="stock"
                            readonly
                            class="w-full px-3 py-2 rounded bg-pink-50 text-pink-700 border border-pink-100"
                            value={product.stock}
                        />
                    </div>

                    <!-- BOTONES -->
                    <div class="flex gap-3 pt-2">
                        <button
                            class="flex-1 px-4 py-2 bg-pink-600 rounded hover:bg-pink-700 text-white transition-colors"
                            type="submit"
                        >
                            <i class="fas fa-save mr-2"></i>{editingDocId
                                ? "Actualizar"
                                : "Guardar"}
                        </button>

                        <button
                            type="button"
                            on:click={clearForm}
                            class="flex-1 px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 text-pink-800 transition-colors"
                        >
                            <i class="fas fa-times mr-2"></i>Limpiar
                        </button>
                    </div>
                </form>
            </section>

            <!-- LISTA -->
            <section class="lg:col-span-2">
                <ProductCard
                    {products}
                    {categories}
                    on:edit={handleEditProduct}
                    on:delete={handleDelete}
                />
            </section>
        </div>
    </div>
</div>
