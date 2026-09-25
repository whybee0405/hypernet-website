export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'hypernet-theme'

/**
 * Runs before first paint (inlined in the site layout) so the page never
 * flashes the wrong theme. Saved choice wins; otherwise follow the OS; the
 * brand default is dark.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`
