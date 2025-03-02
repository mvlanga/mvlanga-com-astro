export type MediaAttachment = {
	id: string;
	url: string;
	preview_url: string;
	alt: string;
};

type Tags = {
	name: string;
	url: string;
};

export type Post = {
	id: string;
	content: string;
	created_at: string;
	tags: Tags[];
	media_attachments: MediaAttachment[];
};
