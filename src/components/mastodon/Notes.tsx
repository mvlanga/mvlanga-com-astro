import { Button } from "@/components/common/Button.tsx";
import { MediaModal } from "@/components/mastodon/MediaModal.tsx";
import { NOTES_LIMIT_PER_CALL } from "@/components/mastodon/constants.ts";
import {
	SELECTED_TAG_ALL_VALUE,
	selectedTag,
} from "@/components/mastodon/selectedTagStore.ts";
import type { MediaAttachment, Post } from "@/components/mastodon/types.ts";
import { fetchPostsByUserId } from "@/components/mastodon/utils.ts";
import { useStore } from "@nanostores/react";
import { clsx } from "clsx";
import { AnimatePresence, type Transition, motion } from "motion/react";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";

const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

export const Notes = ({ notes }: { notes: Post[] }) => {
	const [rNotes, setRNotes] = useState<Post[]>(notes);

	const $selectedTag = useStore(selectedTag);
	const [openedImage, setOpenedImage] = useState<MediaAttachment | null>(null);

	const filteredNotes = useMemo(
		() =>
			rNotes.filter(
				(note) =>
					$selectedTag === SELECTED_TAG_ALL_VALUE ||
					note.tags.map(({ name }) => name).includes($selectedTag),
			),
		[rNotes, $selectedTag],
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
			),
		[filteredNotes],
	);

	return (
		<>
			<div className="grid gap-16">
				<AnimatePresence propagate>
					{postsGroupedByMonth.map(([title, posts]) => (
						<Area
							key={title}
							title={title}
							posts={posts as Post[]}
							onMediaClick={setOpenedImage}
						/>
					))}
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{openedImage && (
					<MediaModal
						media={openedImage}
						handleClose={() => setOpenedImage(null)}
					/>
				)}
			</AnimatePresence>

			<Button
				className={clsx(
					notes.length > NOTES_LIMIT_PER_CALL &&
						"cursor-not-allowed opacity-50",
				)}
				onClick={() => {
					console.log("LOAD");
					fetchPostsByUserId(
						"113918561827911895",
						rNotes[rNotes.length - 1].id,
					).then((data) => {
						console.log(data);
						setRNotes((old) => [...old, ...data]);
					});
				}}
				text="Load more"
			/>
		</>
	);
};

type AreaProps = {
	title: string;
	posts: Post[];
	onMediaClick: Dispatch<SetStateAction<MediaAttachment | null>>;
};

const Area = ({ title, posts, onMediaClick }: AreaProps) => {
	return (
		<motion.div
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
			<AnimatePresence propagate>
				{posts?.map((post) => (
					<Note key={post.id} post={post} onMediaClick={onMediaClick} />
				))}
			</AnimatePresence>
		</motion.div>
	);
};

type NoteProps = {
	post: Post;
	onMediaClick: Dispatch<SetStateAction<MediaAttachment | null>>;
};

const Note = ({
	post: { id, content, created_at, media_attachments, tags },
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
							key={media.id}
							layout
							layoutId={media.id}
							onClick={() => onMediaClick(media)}
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
