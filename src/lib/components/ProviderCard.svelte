<script>
    export let provider;
    export let onEdit;
    export let onDelete;
    export let imgSrc;

    let open = false;

    const formatDate = (ts) => {
        try {
            if (!ts) return "";
            // ts puede ser Timestamp de Firestore: tiene toDate()
            const d = ts.toDate ? ts.toDate() : new Date(ts);
            return d.toLocaleDateString("es-CO");
        } catch (e) {
            return "";
        }
    };
</script>

<article
    class="bg-white rounded-lg border border-pink-200 overflow-hidden shadow-sm hover:shadow-pink-300/40 transition-all duration-200 h-full flex flex-col"
>
    <div class="relative h-44 w-full">
        <img
            src={imgSrc(provider)}
            alt={provider.empresa}
            class="w-full h-32 object-cover"
            on:error={(e) => (e.target.src = "/imagenotfound.jpg")}
        />
    </div>

    <div class="p-4 flex-1 flex flex-col text-pink-900">
        <div class="flex justify-between items-start">
            <div class="flex-1 pr-3">
                <h3 class="font-semibold text-2xl leading-tight text-pink-900">
                    {provider.empresa}
                </h3>
                <p class="text-sm text-pink-600 mt-1">
                    <strong>Contacto:</strong>
                    {provider.nombre || "-"}
                </p>
                {#if provider.tipo}
                    <p class="text-xs text-pink-500 mt-1">
                        Tipo: {provider.tipo}
                    </p>
                {/if}
            </div>

            <div class="relative">
                <button
                    class="text-pink-500 px-2 py-1 hover:text-pink-700 cursor-pointer"
                    aria-label="menu-proveedor"
                    on:click={() => (open = !open)}
                >
                    <i class="fas fa-ellipsis-v text-lg"></i>
                </button>

                {#if open}
                    <div
                        class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-pink-200 overflow-hidden z-20"
                    >
                        <button
                            class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 cursor-pointer text-pink-900"
                            on:click={() => {
                                onEdit(provider);
                                open = false;
                            }}
                        >
                            <i class="fas fa-edit"></i> Editar
                        </button>

                        <button
                            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-600 flex items-center gap-2 cursor-pointer"
                            on:click={() => {
                                onDelete(provider.docId);
                                open = false;
                            }}
                        >
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </div>
                {/if}
            </div>
        </div>

        <div class="mt-4 text-sm text-pink-800 flex-1">
            <div class="mb-2">
                <span class="text-xs text-pink-500">Email:</span>
                {provider.email || "-"}
            </div>
            <div class="mb-2">
                <span class="text-xs text-pink-500">Tel:</span>
                {provider.phone || "-"}
            </div>
            <div class="mb-2">
                <span class="text-xs text-pink-500">Dirección:</span>
                {provider.address || "-"}
            </div>
            <div class="mb-2">
                <span class="text-xs text-pink-500">País / Ciudad:</span>
                {provider.pais || "-"} / {provider.ciudad || "-"}
            </div>

            {#if provider.website}
                <div class="mb-2">
                    <a
                        class="text-xs text-pink-700 hover:text-pink-900 hover:underline"
                        href={provider.website}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {provider.website}
                    </a>
                </div>
            {/if}

            {#if provider.comentarios}
                <div class="text-sm text-pink-800 line-clamp-2 flex-1">
                    {provider.comentarios}
                </div>
            {/if}
        </div>

        <div
            class="mt-4 flex items-center justify-between text-xs text-pink-500"
        >
            <div>Id: {provider.id}</div>
            <div>{formatDate(provider.fecha)}</div>
        </div>
    </div>
</article>
