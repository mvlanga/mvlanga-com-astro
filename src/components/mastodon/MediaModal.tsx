import type { MediaAttachment } from "@/components/mastodon/types.ts";
import { useEscapeKey } from "@/utils/useEscapeKey.tsx";
import { motion } from "motion/react";

type MediaModal = { media: MediaAttachment; handleClose: () => void };

export const MediaModal = ({ media, handleClose }: MediaModal) => {
	useEscapeKey(handleClose);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-20 flex h-full w-full cursor-zoom-out items-center justify-center bg-black/50 p-6 md:p-12 xl:p-32"
			onClick={handleClose}
		>
			<motion.img
				layout
				layoutId={media.id}
				onClick={(e) => e.stopPropagation()}
				className="h-full max-h-full max-w-full cursor-default rounded-4xl object-contain"
				src={media.url}
				alt={media.description}
			/>
		</motion.div>
	);
};
