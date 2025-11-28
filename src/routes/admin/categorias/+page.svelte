<script>
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import CategoryCard from "$lib/components/CategoryCard.svelte";
    import { onMount } from "svelte";
    import {
        loadCategories,
        saveCategory,
        deleteCategoryByDocId,
        emptyCategory,
    } from "$lib/js/categoriesCrud";

    let formData = { ...emptyCategory() };
    let editingDocId = null;
    let categories = [];

    $: formTitle = editingDocId ? "Editar categoría" : "Nueva categoría";

    onMount(async () => {
        categories = await loadCategories();
    });

    function startEdit(category) {
        editingDocId = category.docId;
        formData = { ...emptyCategory(), ...category };
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function clearForm() {
        formData = { ...emptyCategory() };
        editingDocId = null;
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            await saveCategory(formData, editingDocId);

            // Recargar categorías
            categories = await loadCategories();

            clearForm();

            // Scroll hacia la lista
            const listElement = document.querySelector(
                "section.lg\\:col-span-2",
            );
            if (listElement) {
                listElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "Error al guardar categoría");
        }
    }

    async function handleDelete(docId) {
        if (!confirm("¿Eliminar categoría?")) return;

        try {
            await deleteCategoryByDocId(docId);

            // Actualizar lista localmente
            categories = categories.filter((c) => c.docId !== docId);

            if (editingDocId === docId) clearForm();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar categoría");
        }
    }
</script>

<div class="min-h-screen bg-pink-50 text-pink-900 p-4">
    <div class="max-w-6xl mx-auto space-y-6">
        <header class="flex items-center justify-between">
            <h1 class="text-3xl font-bold flex items-center gap-3">
                <i class="fas fa-tags"></i> Categorías
            </h1>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section
                class="bg-white p-6 rounded-lg border border-pink-100 h-fit shadow-sm"
            >
                <h2 class="text-xl font-semibold mb-4">{formTitle}</h2>

                <form on:submit|preventDefault={handleSave} class="space-y-4">
                    <div>
                        <label
                            for="codigo"
                            class="block text-sm font-medium text-pink-900 mb-1"
                            >Código *</label
                        >
                        <input
                            id="codigo"
                            type="text"
                            bind:value={formData.codigo}
                            required
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label
                            for="nombre"
                            class="block text-sm font-medium text-pink-900 mb-1"
                            >Nombre *</label
                        >
                        <input
                            id="nombre"
                            type="text"
                            bind:value={formData.nombre}
                            required
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label
                            for="descripcion"
                            class="block text-sm font-medium text-pink-900 mb-1"
                            >Descripción</label
                        >
                        <textarea
                            id="descripcion"
                            bind:value={formData.descripcion}
                            rows="3"
                            class="w-full px-3 py-2 bg-white border border-pink-200 rounded-md text-pink-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        ></textarea>
                    </div>

                    <div>
                        <label
                            for="imagen"
                            class="block text-sm font-medium text-pink-900 mb-1"
                        >
                            URL de la imagen
                        </label>
                        <input
                            type="url"
                            id="imagen"
                            bind:value={formData.imagen}
                            class="w-full px-3 py-2 bg-white border border-pink-200 rounded-md text-pink-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {#if formData.imagen}
                            <div class="mt-2">
                                <p class="text-sm text-pink-600 mb-1">
                                    Vista previa:
                                </p>
                                <img
                                    src={formData.imagen}
                                    alt="Vista previa de la categoría"
                                    class="h-32 w-32 object-cover rounded-md border border-pink-200 bg-pink-50"
                                    on:error={() =>
                                        (formData.imagen =
                                            "/imagenotfound.jpg")}
                                />
                            </div>
                        {/if}
                    </div>

                    <div class="flex gap-2 pt-2">
                        <button
                            type="submit"
                            class="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                        >
                            <i class="fas fa-save"></i>
                            {editingDocId ? "Actualizar" : "Guardar"}
                        </button>

                        {#if editingDocId}
                            <button
                                type="button"
                                on:click={clearForm}
                                class="bg-pink-100 hover:bg-pink-200 text-pink-800 py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                <i class="fas fa-times"></i> Cancelar
                            </button>
                        {/if}
                    </div>
                </form>
            </section>

            <section class="lg:col-span-2">
                <div class="mb-4 flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Listado de categorías</h2>
                    <div class="text-sm text-pink-600">
                        {categories.length}
                        {categories.length === 1 ? "categoría" : "categorías"}
                    </div>
                </div>

                {#if categories.length === 0}
                    <div
                        class="bg-white rounded-lg border-2 border-dashed border-pink-200 p-8 text-center"
                    >
                        <i class="fas fa-box-open text-4xl text-pink-300 mb-2"
                        ></i>
                        <p class="text-pink-700">
                            No hay categorías registradas
                        </p>
                        <p class="text-sm text-pink-500 mt-1">
                            Crea tu primera categoría
                        </p>
                    </div>
                {:else}
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {#each categories as cat (cat.docId)}
                            <CategoryCard
                                category={cat}
                                onEdit={() => startEdit(cat)}
                                onDelete={() => handleDelete(cat.docId)}
                            />
                        {/each}
                    </div>
                {/if}
            </section>
        </div>
    </div>
</div>
