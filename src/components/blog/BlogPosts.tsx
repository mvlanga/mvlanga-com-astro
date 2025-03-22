import type { CollectionEntry } from "astro:content";
import {
	SELECTED_TAG_ALL_VALUE,
	selectedTag,
} from "@/components/blog/selectedTagStore.ts";
import { useStore } from "@nanostores/react";
import { AnimatePresence, type Transition, motion } from "motion/react";
import { useMemo } from "react";

const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

type BlogPostsProps = { blogPosts: CollectionEntry<"blogPosts">[] };

export const BlogPosts = ({ blogPosts }: BlogPostsProps) => {
	const $selectedTag = useStore(selectedTag);

	const filteredBlogPosts = useMemo(
		() =>
			blogPosts.filter(
				(post) =>
					$selectedTag === SELECTED_TAG_ALL_VALUE ||
					post.data.tags.includes($selectedTag),
			),
		[blogPosts, $selectedTag],
	);

	const postsGroupedByMonth = useMemo(
		() =>
			Object.entries(
				Object.groupBy(filteredBlogPosts, ({ data: { createdAt } }) => {
					const isThisYear =
						createdAt.getFullYear() === new Date().getFullYear();

					return createdAt.toLocaleString("en-US", {
						month: "long",
						...(isThisYear ? {} : { year: "numeric" }),
					});
				}),
			),
		[filteredBlogPosts],
	);

	return (
		<section className="grid gap-16">
			<AnimatePresence propagate>
				{postsGroupedByMonth.map(
					([title, posts]) =>
						posts &&
						posts.length > 0 && (
							<Area key={title} title={title} posts={posts} />
						),
				)}
			</AnimatePresence>
		</section>
	);
};

type AreaProps = {
	title: string;
	posts: CollectionEntry<"blogPosts">[];
};

const Area = ({ title, posts }: AreaProps) => {
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
					<Post key={post.id} post={post} />
				))}
			</AnimatePresence>
		</motion.div>
	);
};

type PostProps = {
	post: CollectionEntry<"blogPosts">;
};

const Post = ({
	post: {
		id,
		data: { title, createdAt, tags, description },
	},
}: PostProps) => {
	return (
		<motion.a
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={layoutTransition}
			className="@container col-span-1 flex w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 p-12 transition-colors hover:bg-neutral-800"
			href={`/blog/${id}`}
		>
			<div className="flex flex-col items-start gap-6">
				<motion.h5 className="text-lg" layout>
					{title}
				</motion.h5>
				<motion.p layout className="text-neutral-300">
					{description}
				</motion.p>
			</div>

			<div className="flex flex-wrap justify-between gap-2 text-neutral-400 text-xs">
				{tags.map((tag) => `#${tag}`).join(", ")}
				<p>{createdAt.toLocaleDateString("en-US")}</p>
			</div>
		</motion.a>
	);
};
