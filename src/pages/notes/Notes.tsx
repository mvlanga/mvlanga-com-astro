import type { MediaAttachment, Post } from "@/pages/notes/types.ts";
import { useEscapeKey } from "@/utils/useEscapeKey.tsx";
import { useStore } from "@nanostores/react";
import { clsx } from "clsx";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { SELECTED_TAG_ALL_VALUE, selectedTag } from "./selectedTagStore";

type NotesProps = {
	notes: Post[];
};

export const Notes = ({ notes }: NotesProps) => {
	const $selectedTag = useStore(selectedTag);
	const [openedImage, setOpenedImage] = useState<MediaAttachment | null>(null);

	useEscapeKey(() => setOpenedImage(null));

	const filteredNotes = notes.filter(
		(note) =>
			$selectedTag === SELECTED_TAG_ALL_VALUE ||
			note.tags.map(({ name }) => name).includes($selectedTag),
	);

	const postsGroupedByMonth = Object.groupBy(
		filteredNotes,
		({ created_at }) => {
			const createdAt = new Date(created_at);

			const isThisYear = createdAt.getFullYear() === new Date().getFullYear();

			return createdAt.toLocaleString("en-US", {
				month: "long",
				...(isThisYear ? {} : { year: "numeric" }),
			});
		},
	);

	return (
		<LayoutGroup>
			<motion.div layout className="grid gap-16">
				{Object.entries(postsGroupedByMonth).map(([monthName, statuses]) => (
					<div key={monthName} className="grid gap-8">
						<motion.p
							layout
							className="text-2xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{monthName}
						</motion.p>
						<motion.div
							layout
							className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2"
						>
							<AnimatePresence>
								{statuses
									?.filter((v) => v)
									.map(
										({ id, content, created_at, media_attachments, tags }) => (
											<motion.div
												layout
												key={id}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="@container col-span-1 flex w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 p-12"
											>
												<div className="flex flex-col items-start gap-8">
													<motion.div
														layout
														className="flex flex-col gap-4"
														// biome-ignore lint/security/noDangerouslySetInnerHtml: Content already sanitized in astro
														dangerouslySetInnerHTML={{ __html: content }}
													/>
													<div
														className={clsx(
															"grid gap-4",
															media_attachments.length > 1 && "@md:grid-cols-2",
														)}
													>
														{media_attachments.map((media) => (
															<motion.img
																layout
																layoutId={media.id}
																onClick={() => setOpenedImage(media)}
																key={media.id}
																className="grid-span-1 max-h-[60vh] cursor-zoom-in rounded-2xl"
																src={media.preview_url}
																alt={media.alt}
																loading="lazy"
															/>
														))}
													</div>
												</div>
												<div className="flex flex-wrap justify-between gap-2 text-neutral-400 text-xs">
													{tags.map(({ name }) => `#${name}`).join(", ")}
													<p>{new Date(created_at).toLocaleString("en-US")}</p>
												</div>
											</motion.div>
										),
									)}
							</AnimatePresence>
						</motion.div>
					</div>
				))}
			</motion.div>

			<AnimatePresence>
				{openedImage && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: escape dismisses the modal already
					<div
						className="fixed inset-0 z-20 flex h-full w-full cursor-zoom-out items-center justify-center bg-black/50 p-6 md:p-12 xl:p-32"
						onClick={() => setOpenedImage(null)}
					>
						<motion.img
							layout
							layoutId={openedImage.id}
							onClick={(e) => e.stopPropagation()}
							className="max-h-full max-w-full cursor-default rounded-4xl"
							src={openedImage.preview_url}
							alt={openedImage.alt}
						/>
					</div>
				)}
			</AnimatePresence>
		</LayoutGroup>
	);
};
