<script>
    export let account;
    export let onEdit;
    export let onDelete;

    let open = false;

    const formatDate = (ts) => {
        if (!ts) return "";
        try {
            const d = ts.toDate?.() ?? new Date(ts);
            return d.toLocaleDateString("es-CO");
        } catch {
            return "";
        }
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value || 0);

    const config = {
        tipo: {
            ingreso: { color: "text-green-400", icon: "fa-arrow-down" },
            gasto: { color: "text-red-400", icon: "fa-arrow-up" },
        },
        categoria: {
            venta: "Venta",
            servicios: "Servicios",
            nomina: "Nómina",
            alquiler: "Alquiler",
            compra: "Compra",
            otros: "Otros",
        },
    };

    $: tipoConfig = config.tipo[account.tipo] || {
        color: "text-pink-400",
        icon: "fa-exchange-alt",
    };
    $: categoriaLabel =
        config.categoria[account.categoria] ||
        account.categoria ||
        "Sin categoría";
    $: isProductSale =
        account.tipo === "ingreso" && account.categoria === "venta";
    $: displayTitle = isProductSale
        ? account.productoNombre || "Venta de producto"
        : categoriaLabel;
</script>

<article
    class="bg-white rounded-lg border border-pink-200 hover:border-pink-300 transition-all duration-200 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg"
>
    <div class="p-4 text-pink-900">
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <!-- Header -->
                <div class="flex items-center gap-3">
                    <div class={`text-2xl ${tipoConfig.color}`}>
                        <i class={`fas ${tipoConfig.icon}`}></i>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-900">
                            {displayTitle}
                        </h3>
                        <p class="text-sm text-pink-600">
                            {account.tipo === "ingreso" ? "Ingreso" : "Gasto"} •
                            {formatDate(account.fecha)}
                        </p>
                    </div>
                </div>

                <!-- Transaction Details -->
                <div class="mt-3 space-y-2">
                    <!-- Product Sales Details -->
                    {#if isProductSale && account.tallasVendidas?.length > 0}
                        <div class="text-sm">
                            <div class="text-xs text-pink-400 mb-1">
                                Productos vendidos:
                            </div>
                            <div class="space-y-1">
                                {#each account.tallasVendidas as item}
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <span>
                                            {item.cantidad}x Talla {item.talla}
                                            <span class="text-pink-400 text-sm">
                                                ({formatCurrency(
                                                    item.precioUnitario,
                                                )} c/u)
                                            </span>
                                        </span>
                                        <span class="font-medium">
                                            {formatCurrency(
                                                (item.precioUnitario || 0) *
                                                    item.cantidad,
                                            )}
                                        </span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    <!-- Total Amount -->
                    <div class="pt-2 border-t border-pink-700">
                        <div class="flex justify-between items-center">
                            <span class="text-pink-900 font-medium">Total:</span
                            >
                            <span class={`font-bold ${tipoConfig.color}`}>
                                {formatCurrency(account.monto)}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                {#if account.descripcion}
                    <div class="mt-3 pt-3 border-t border-pink-100">
                        <p class="text-sm text-pink-800">
                            {account.descripcion}
                        </p>
                    </div>
                {/if}
            </div>

            <!-- Actions Menu -->
            <div class="relative">
                <button
                    class="text-pink-500 hover:text-pink-700 p-1"
                    on:click|stopPropagation={() => (open = !open)}
                    aria-label="Menú de cuenta"
                >
                    <i class="fas fa-ellipsis-v"></i>
                </button>

                {#if open}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-pink-200 z-10"
                        on:click|stopPropagation
                    >
                        <button
                            class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 rounded-t-md text-pink-900"
                            on:click={() => {
                                onEdit(account);
                                open = false;
                            }}
                        >
                            <i class="fas fa-edit text-pink-500"></i>
                            <span>Editar</span>
                        </button>
                        <button
                            class="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 flex items-center gap-2 text-red-600 rounded-b-md"
                            on:click={() => {
                                onDelete(account.docId);
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
    </div>
</article>
