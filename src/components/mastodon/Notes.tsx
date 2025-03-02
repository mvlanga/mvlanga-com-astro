import { MediaModal } from "@/components/mastodon/MediaModal.tsx";
import {
	SELECTED_TAG_ALL_VALUE,
	selectedTag,
} from "@/components/mastodon/selectedTagStore.ts";
import type { MediaAttachment, Post } from "@/components/mastodon/types.ts";
import { useStore } from "@nanostores/react";
import { clsx } from "clsx";
import {
	AnimatePresence,
	LayoutGroup,
	type Transition,
	motion,
} from "motion/react";
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useMemo,
	useState,
} from "react";

const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

export const Notes = ({ notes }: { notes: Post[] }) => {
	const $selectedTag = useStore(selectedTag);
	const [openedImage, setOpenedImage] = useState<MediaAttachment | null>(null);

	const filteredNotes = useMemo(
		() =>
			notes.filter(
				(note) =>
					$selectedTag === SELECTED_TAG_ALL_VALUE ||
					note.tags.map(({ name }) => name).includes($selectedTag),
			),
		[notes, $selectedTag],
	);

	const postsGroupedByMonth = useMemo(
		() =>
			Object.entries(
				Object.groupBy(filteredNotes, ({ created_at }) => {
					const createdAt = new Date(created_at);

					const isThisYear =
						createdAt.getFullYear() === new Date().getFullYear();

					return createdAt.toLocaleString("en-US", {
						month: "long",
						...(isThisYear ? {} : { year: "numeric" }),
					});
				}),
			).map(([title, posts]) => ({
				title,
				posts,
			})),
		[filteredNotes],
	);

	return (
		<>
			<LayoutGroup>
				<motion.div layout className="grid gap-16">
					<AnimatePresence>
						{postsGroupedByMonth.map(({ title, posts }) => (
							<motion.div
								key={title}
								layout
								transition={layoutTransition}
								className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2"
							>
								<motion.p
									layout
									className="col-span-full text-2xl"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={layoutTransition}
								>
									{title}
								</motion.p>
								<AnimatePresence>
									{posts?.map((post) => (
										<Note
											key={post.id}
											note={post}
											onMediaClick={setOpenedImage}
										/>
									))}
								</AnimatePresence>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</LayoutGroup>

			{openedImage && (
				<MediaModal
					media={openedImage}
					handleClose={() => setOpenedImage(null)}
				/>
			)}
		</>
	);
};

type NoteProps = {
	note: Post;
	onMediaClick: Dispatch<SetStateAction<MediaAttachment | null>>;
};

const Note = ({
	note: { id, content, created_at, media_attachments, tags },
	onMediaClick,
}: NoteProps) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={layoutTransition}
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
							onClick={() => onMediaClick(media)}
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
	);
};
