
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/categorias" | "/admin/cuentas" | "/admin/prendas" | "/admin/proveedores" | "/catalogo" | "/contacto" | "/login" | "/nosotros";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/categorias": Record<string, never>;
			"/admin/cuentas": Record<string, never>;
			"/admin/prendas": Record<string, never>;
			"/admin/proveedores": Record<string, never>;
			"/catalogo": Record<string, never>;
			"/contacto": Record<string, never>;
			"/login": Record<string, never>;
			"/nosotros": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/" | "/admin/categorias" | "/admin/categorias/" | "/admin/cuentas" | "/admin/cuentas/" | "/admin/prendas" | "/admin/prendas/" | "/admin/proveedores" | "/admin/proveedores/" | "/catalogo" | "/catalogo/" | "/contacto" | "/contacto/" | "/login" | "/login/" | "/nosotros" | "/nosotros/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/imagenotfound.jpg" | "/logo.jpg" | "/logo.svg" | "/robots.txt" | string & {};
	}
}