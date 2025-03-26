import { actions } from "astro:actions";
import type { CollectionEntry } from "astro:content";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterTag,
} from "@/components/blog/blogFilterStore.ts";
import { groupPostsByMonth } from "@/components/blog/utils.ts";
import { useOnMount } from "@/utils/useOnMount.ts";
import { useStore } from "@nanostores/react";
import {
	AnimatePresence,
	LayoutGroup,
	type Transition,
	motion,
} from "motion/react";
import { useMemo, useState } from "react";

const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

type BlogPost = CollectionEntry<"blogPosts"> & { viewCount?: number };

type BlogPostsProps = { blogPosts: BlogPost[] };

export const BlogPosts = ({ blogPosts }: BlogPostsProps) => {
	const $selectedTag = useStore(blogFilterTag);

	const [isLoading, setIsLoading] = useState(true);
	const [blogPostsWithViewCount, setBlogPostsWithViewCount] = useState<
		BlogPost[]
	>([]);

	useOnMount(() => {
		const fetchData = async () => {
			const { data, error } = await actions.getPageViews(
				blogPosts.map((post) => post.id),
			);

			setIsLoading(false);

			if (error) {
				throw new Error("Unable to run `blogPostViews` action");
			}

			if (data === undefined) {
				throw new Error("Returned data of `blogPostViews` action is unusable");
			}

			setBlogPostsWithViewCount(
				blogPosts.map((post) => ({
					...post,
					viewCount: data.find(({ id }) => id === post.id)?.count ?? 0,
				})),
			);
		};

		fetchData().catch(console.error);
	});

	const filteredBlogPosts = useMemo(
		() =>
			blogPostsWithViewCount.filter(
				(post) =>
					$selectedTag === BLOG_FILTER_TAG_ALL_VALUE ||
					post.data.tags.includes($selectedTag),
			),
		[blogPostsWithViewCount, $selectedTag],
	);

	const postsGroupedByMonth = useMemo(
		() => groupPostsByMonth(filteredBlogPosts),
		[filteredBlogPosts],
	);

	return (
		<section className="grid gap-16">
			<LayoutGroup>
				<AnimatePresence propagate>
					{postsGroupedByMonth.map(
						([title, posts]) =>
							posts &&
							posts.length > 0 && (
								<Area
									key={title}
									title={title}
									posts={posts}
									isLoading={isLoading}
								/>
							),
					)}
				</AnimatePresence>
			</LayoutGroup>
		</section>
	);
};

type AreaProps = {
	title: string;
	posts: BlogPost[];
	isLoading: boolean;
};

const Area = ({ title, posts, isLoading }: AreaProps) => {
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
					<Post key={post.id} post={post} isLoading={isLoading} />
				))}
			</AnimatePresence>
		</motion.div>
	);
};

type PostProps = {
	post: BlogPost;
	isLoading: boolean;
};

export const Post = ({
	post: {
		id,
		data: { title, createdAt, tags, description },
		viewCount,
	},
	isLoading,
}: PostProps) => {
	return (
		<motion.a
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={layoutTransition}
			className="group col-span-1 flex h-full w-full flex-col justify-between gap-8 rounded-4xl bg-neutral-900 p-12 transition-colors hover:bg-neutral-800"
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

			<hr className="border-neutral-800 transition-colors group-hover:border-neutral-700" />

			<div className="flex flex-wrap justify-between gap-4 text-neutral-400 text-xs">
				<p>{tags.map((tag) => `#${tag}`).join(", ")}</p>

				<div className="flex flex-wrap gap-4">
					{isLoading ? (
						<div className="inline-block h-[1lh] w-[8ch] animate-pulse rounded-lg bg-neutral-800" />
					) : (
						<span>{viewCount} views</span>
					)}

					<p>{createdAt.toLocaleDateString("en-US")}</p>
				</div>
			</div>
		</motion.a>
	);
};
