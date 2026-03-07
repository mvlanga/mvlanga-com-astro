interface ImportMeta {
	readonly env: ImportMetaEnv & {
		IS_DEPLOY_PREVIEW?: "true";
	};
}
