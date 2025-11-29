<script>
	import "../app.css";
	import { page } from "$app/stores";

	let { children } = $props();

	// Detectar si estamos en rutas de admin
	const isAdminRoute = $derived($page.url.pathname.startsWith("/admin"));

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Cerrar menú móvil cuando se hace clic en un enlace
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head>
	<link rel="icon" href="/logo.jpg" />
</svelte:head>

{#if !isAdminRoute}
	<!-- Navbar público -->
	<header
		class="sticky top-0 z-50 bg-pink-50/95 backdrop-blur-sm border-b border-pink-200 text-pink-600"
	>
		<nav class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-center">
				<!-- Desktop Menu -->
				<div class="hidden md:flex items-center gap-6">
					<a
						href="/"
						class="hover:bg-pink-100 text-pink-700 transition-colors {$page
							.url.pathname === '/'
							? 'text-pink-700 font-semibold'
							: ''}"
					>
						<i class="fas fa-home"></i>
						Inicio
					</a>
					<a
						href="/catalogo"
						class="hover:bg-pink-100 text-pink-700 transition-colors {$page
							.url.pathname === '/catalogo'
							? 'text-pink-700 font-semibold'
							: ''}"
					>
						<i class="fas fa-shopping-bag"></i>
						Catálogo
					</a>
					<a
						href="/nosotros"
						class="hover:bg-pink-100 text-pink-700 transition-colors {$page
							.url.pathname === '/nosotros'
							? 'text-pink-700 font-semibold'
							: ''}"
					>
						<i class="fas fa-info-circle"></i>
						Nosotros
					</a>
					<a
						href="/contacto"
						class="hover:bg-pink-100 text-pink-700 transition-colors {$page
							.url.pathname === '/contacto'
							? 'text-pink-700 font-semibold'
							: ''}"
					>
						<i class="fas fa-envelope"></i>
						Contacto
					</a>
				</div>
				<div
					class="md:hidden flex items-center justify-between gap-4 w-full"
				>
					<div class="flex items-center justify-center gap-2">
						<img
							src="/logo.jpg"
							class="rounded-full border-pink-400 border-2 h-16"
							alt="logo-imagen"
						/>
						<h1 class="text-2xl font-white">ANGEL STORE</h1>
					</div>
					<!-- Mobile Menu Button -->
					<button
						class="text-white text-2xl"
						onclick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						<i class="fas fa-{mobileMenuOpen ? 'times' : 'bars'}"
						></i>
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
					<div>
						<a
							href="/"
							class={`bg-white/90 text-pink-800 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-pink-100 shadow-sm hover:shadow-md ${$page.url.pathname === "/" ? "text-pink-700 font-semibold" : ""}`}
							onclick={closeMobileMenu}
						>
							<i class="fas fa-home"></i> Inicio
						</a>
						<a
							href="/catalogo"
							class={`bg-white/90 text-pink-800 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-pink-100 shadow-sm hover:shadow-md ${$page.url.pathname === "/catalogo" ? "text-pink-700 font-semibold" : ""}`}
							onclick={closeMobileMenu}
						>
							<i class="fas fa-shopping-bag"></i> Catálogo
						</a>
						<a
							href="/nosotros"
							class={`bg-white/90 text-pink-800 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-pink-100 shadow-sm hover:shadow-md ${$page.url.pathname === "/nosotros" ? "text-pink-700 font-semibold" : ""}`}
							onclick={closeMobileMenu}
						>
							<i class="fas fa-info-circle"></i> Nosotros
						</a>
						<a
							href="/contacto"
							class={`bg-white/90 text-pink-800 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-pink-100 shadow-sm hover:shadow-md ${$page.url.pathname === "/contacto" ? "text-pink-700 font-semibold" : ""}`}
							onclick={closeMobileMenu}
						>
							<i class="fas fa-envelope"></i> Contacto
						</a>
					</div>
				</div>
			{/if}
		</nav>
	</header>
{/if}

{@render children()}

{#if !isAdminRoute}
	<!-- Footer público -->
	<footer class="bg-pink-50 py-12 text-pink-800 border-t border-pink-100">
		<div class="container mx-auto px-4">
			<div class="flex flex-col items-center">
				<div class="w-20 h-20 mb-6 rounded-full">
					<img
						src="/logo.jpg"
						alt="Angel Store Logo"
						class="w-full h-full object-cover rounded-full"
					/>
				</div>

				<p
					class="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-pink-700 to-pink-500 mb-4"
				>
					ANGEL STORE
				</p>

				<p class="text-pink-800 text-center max-w-md mb-8">
					"Además de venderte ropa, te vendemos estilo"
				</p>

				<div class="flex space-x-6 mb-8">
					<a
						href="https://wa.me/573146608596"
						target="_blank"
						rel="noopener noreferrer"
						class="text-pink-600 hover:text-pink-800 text-xl transition-colors"
						aria-label="WhatsApp"
					>
						<i class="fab fa-whatsapp"></i>
					</a>
					<a
						href="https://www.instagram.com/_angelstore.col/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-pink-600 hover:text-pink-800 text-xl transition-colors"
						aria-label="Instagram"
					>
						<i class="fab fa-instagram"></i>
					</a>
					<a
						href="https://www.tiktok.com/@angelstore.col"
						target="_blank"
						rel="noopener noreferrer"
						class="text-pink-600 hover:text-pink-800 text-xl transition-colors"
						aria-label="TikTok"
					>
						<i class="fab fa-tiktok"></i>
					</a>
					<a
						href="https://www.facebook.com/profile.php?id=61577089975240&mibextid=wwXIfr&rdid=gXekY2YW3gmfEvaA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14EZQveNS6L%2F%3Fmibextid%3DwwXIfr#"
						target="_blank"
						rel="noopener noreferrer"
						class="text-pink-600 hover:text-pink-800 text-xl transition-colors"
						aria-label="Facebook"
					>
						<i class="fab fa-facebook"></i>
					</a>
				</div>

				<div class="border-t border-pink-800 w-full max-w-2xl pt-8">
					<p class="text-pink-700 text-center">
						&copy; {new Date().getFullYear()} Angel Store.
					</p>
					<p class="text-xs text-pink-700 text-center mt-2">
						Diseñado con ❤️ para amantes de la moda
					</p>
				</div>
			</div>
		</div>
	</footer>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}
</style>
