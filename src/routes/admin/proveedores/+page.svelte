<script>
    import ProviderCard from "$lib/components/ProviderCard.svelte";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import { onMount } from "svelte";
    import {
        loadProviders,
        saveProvider,
        deleteProviderByDocId,
        getNextId,
    } from "$lib/js/providersCrud.js";

    // Form fields
    let editingDocId = null;
    let id = null;
    let empresa = "";
    let tipo = "";
    let address = "";
    let phone = "";
    let email = "";
    let website = "";
    let nombre = "";
    let cargo = "";
    let pais = "";
    let ciudad = "";
    let fecha = "";
    let comentarios = "";
    let image = "";

    let preview = "/imagenotfound.jpg";
    let providers = [];

    $: preview = image && image.trim() !== "" ? image : "/imagenotfound.jpg";

    onMount(async () => {
        providers = await loadProviders();
    });

    function clearForm() {
        editingDocId = null;
        id = null;
        empresa = "";
        tipo = "";
        address = "";
        phone = "";
        email = "";
        website = "";
        nombre = "";
        cargo = "";
        pais = "";
        ciudad = "";
        fecha = "";
        comentarios = "";
        image = "";
    }

    async function handleSave(e) {
        e.preventDefault();

        if (!id) id = await getNextId();

        const payload = {
            id: Number(id),
            empresa,
            tipo,
            address,
            phone,
            email,
            website,
            nombre,
            cargo,
            pais,
            ciudad,
            fecha: fecha || null,
            comentarios,
            image,
        };

        await saveProvider(payload, editingDocId);

        // Recargar proveedores
        providers = await loadProviders();

        clearForm();

        // Scroll hacia la lista
        const listElement = document.querySelector("section.lg\\:col-span-2");
        if (listElement) {
            listElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    function startEdit(provider) {
        editingDocId = provider.docId;
        id = provider.id;
        empresa = provider.empresa ?? "";
        tipo = provider.tipo ?? "";
        address = provider.address ?? "";
        phone = provider.phone ?? "";
        email = provider.email ?? "";
        website = provider.website ?? "";
        nombre = provider.nombre ?? "";
        cargo = provider.cargo ?? "";
        pais = provider.pais ?? "";
        ciudad = provider.ciudad ?? "";

        if (provider.fecha && provider.fecha.toDate) {
            const d = provider.fecha.toDate();
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            fecha = `${y}-${m}-${day}`;
        } else {
            fecha = provider.fecha ?? "";
        }

        comentarios = provider.comentarios ?? "";
        image = provider.image ?? "";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function remove(docId) {
        if (!confirm("¿Eliminar proveedor?")) return;

        await deleteProviderByDocId(docId);

        // Actualizar lista localmente
        providers = providers.filter((p) => p.docId !== docId);

        if (editingDocId === docId) clearForm();
    }

    const imgSrc = (p) =>
        p?.image && p.image.trim() !== "" ? p.image : "/imagenotfound.jpg";
</script>

<div class="min-h-screen bg-pink-50 text-pink-800 p-4">
    <div class="max-w-6xl mx-auto space-y-6">
        <header class="flex items-center justify-between">
            <h1 class="text-3xl font-bold flex items-center gap-3">
                <i class="fas fa-handshake"></i> Proveedores
            </h1>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- FORM -->
            <section
                class="bg-white p-6 rounded-lg border border-pink-200 shadow-sm h-fit"
            >
                <h2 class="text-xl font-semibold mb-4">
                    {editingDocId ? "Editar proveedor" : "Agregar proveedor"}
                </h2>

                <form on:submit|preventDefault={handleSave} class="space-y-4">
                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="empresa">Empresa</label
                        >
                        <input
                            id="empresa"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={empresa}
                            required
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="tipo">Tipo</label
                        >
                        <input
                            id="tipo"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={tipo}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="address">Dirección</label
                        >
                        <input
                            id="address"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={address}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="phone">Teléfono</label
                        >
                        <input
                            id="phone"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={phone}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="email">Email</label
                        >
                        <input
                            id="email"
                            type="email"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={email}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="website">Website</label
                        >
                        <input
                            id="website"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={website}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="nombre">Nombre (contacto)</label
                        >
                        <input
                            id="nombre"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={nombre}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="cargo">Cargo</label
                        >
                        <input
                            id="cargo"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={cargo}
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label
                                class="text-sm font-medium text-pink-900"
                                for="pais">País</label
                            >
                            <input
                                id="pais"
                                class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                bind:value={pais}
                            />
                        </div>
                        <div>
                            <label
                                class="text-sm font-medium text-pink-900"
                                for="ciudad">Ciudad</label
                            >
                            <input
                                id="ciudad"
                                class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                bind:value={ciudad}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="fecha">Fecha</label
                        >
                        <input
                            id="fecha"
                            type="date"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={fecha}
                        />
                    </div>

                    <div>
                        <label
                            class="text-sm font-medium text-pink-900"
                            for="comentarios">Comentarios</label
                        >
                        <textarea
                            id="comentarios"
                            rows="3"
                            class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                            bind:value={comentarios}
                        ></textarea>
                    </div>

                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
                    >
                        <div>
                            <label
                                class="text-sm font-medium text-pink-900"
                                for="image">Imagen (URL)</label
                            >
                            <input
                                id="image"
                                class="w-full px-3 py-2 rounded bg-white text-pink-900 border border-pink-200 focus:ring-2 focus:ring-pink-500"
                                bind:value={image}
                                placeholder="https://..."
                                on:input={() =>
                                    (preview =
                                        image && image.trim()
                                            ? image
                                            : "/imagenotfound.jpg")}
                            />
                        </div>

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
                    </div>

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

            <!-- LIST -->
            <section class="lg:col-span-2">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                    {#if providers.length === 0}
                        <div
                            class="bg-white col-span-full rounded-lg border-2 border-dashed border-pink-200 p-8 text-center"
                        >
                            <i
                                class="fas fa-box-open text-4xl text-pink-300 mb-2"
                            ></i>
                            <p class="text-pink-700">No hay proveedores</p>
                            <p class="text-sm text-pink-500 mt-1">
                                Crea tu primer proveedor
                            </p>
                        </div>
                    {:else}
                        {#each providers as p (p.docId)}
                            <ProviderCard
                                provider={p}
                                {imgSrc}
                                onEdit={startEdit}
                                onDelete={remove}
                            />
                        {/each}
                    {/if}
                </div>
            </section>
        </div>
    </div>
</div>
