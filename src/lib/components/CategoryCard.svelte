<script>
    export let category;
    export let onEdit;
    export let onDelete;

    let open = false;

    const fmtDate = (t) => {
        if (!t) return "-";
        try {
            const d = t.toDate ? t.toDate() : new Date(t);
            return d.toLocaleString();
        } catch (e) {
            return String(t);
        }
    };
</script>

<svelte:window on:click={() => (open = false)} />

<article
    class="bg-white rounded-lg border border-pink-200 shadow-sm hover:shadow-lg transition-all duration-200 h-full flex flex-col relative"
>
    <!-- Imagen recortada (todas mismas dimensiones) -->
    <div class="w-full h-48 overflow-hidden bg-pink-100 shrink-0">
        {#if category.imagen}
            <img
                src={category.imagen}
                alt={category.nombre}
                class="w-full h-full object-cover"
            />
        {:else}
            <img
                src="/imagenotfound.jpg"
                alt={category.nombre}
                class="w-full h-full object-cover"
            />
        {/if}
    </div>

    <!-- Contenido -->
    <div
        class="p-4 flex-1 flex flex-col text-pink-900 justify-between relative"
    >
        <div class="flex-1 pr-3">
            <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="font-semibold text-2xl leading-tight text-pink-900">
                    {category.nombre}
                </h3>

                <!-- Botón de menú -->
                <div class="relative">
                    <button
                        class="text-pink-500 px-2 py-1 hover:text-pink-700 cursor-pointer rounded-full hover:bg-pink-50"
                        aria-label="menu-categoria"
                        on:click|stopPropagation={() => (open = !open)}
                    >
                        <i class="fas fa-ellipsis-v text-lg"></i>
                    </button>

                    {#if open}
                        <div
                            class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-pink-200 z-20 overflow-hidden"
                        >
                            <button
                                class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 cursor-pointer text-pink-700"
                                on:click={() => {
                                    onEdit(category);
                                    open = false;
                                }}
                            >
                                <i class="fas fa-edit"></i>
                                <span>Editar</span>
                            </button>

                            <button
                                class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 cursor-pointer text-red-500 border-t border-pink-100"
                                on:click={() => {
                                    if (confirm("¿Eliminar categoría?")) {
                                        onDelete(category.docId);
                                    }
                                    open = false;
                                }}
                            >
                                <i class="fas fa-trash-alt"></i>
                                <span>Eliminar</span>
                            </button>
                        </div>
                    {/if}
                </div>
            </div>

            <p class="text-sm text-pink-600 mb-1 line-clamp-2">
                {category.descripcion}
            </p>

            <div class="mt-2 text-xs text-pink-700">
                <div><strong>Código:</strong> {category.codigo}</div>

                <div class="mt-1">
                    <strong>Creada:</strong>
                    {fmtDate(category.fechaCreacion)}
                </div>

                <div class="mt-1">
                    <strong>Actualizada:</strong>
                    {fmtDate(category.fechaActualizacion)}
                </div>
            </div>
        </div>
    </div>
</article>
