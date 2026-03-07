interface ImportMeta {
	readonly env: ImportMetaEnv & {
		DEPLOY_PREVIEW?: boolean;
	};
}
