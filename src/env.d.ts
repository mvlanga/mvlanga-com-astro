type NetlifyLocals = import("@astrojs/netlify").NetlifyLocals;

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals extends NetlifyLocals {}
}
