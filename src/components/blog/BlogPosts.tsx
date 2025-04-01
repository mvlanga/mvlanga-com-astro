import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterSearchTerm,
	blogFilterTag,
} from "@/components/blog/blogFilterStore.ts";
import type { BlogPostWithViewCount } from "@/components/blog/types.ts";
import {
	groupPostsByMonth,
	useBlogPostsWithViewCount,
} from "@/components/blog/utils.ts";
import { Skeleton } from "@/components/common/Skeleton.tsx";
import { useStore } from "@nanostores/react";
import {
	AnimatePresence,
	LayoutGroup,
	type Transition,
	motion,
} from "motion/react";
import { useMemo } from "react";

const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

type BlogPostsProps = { blogPosts: BlogPostWithViewCount[] };

export const BlogPosts = ({ blogPosts }: BlogPostsProps) => {
	const $selectedTag = useStore(blogFilterTag);
	const $searchTerm = useStore(blogFilterSearchTerm);

	const { isLoading, blogPostsWithViewCount } =
		useBlogPostsWithViewCount(blogPosts);

	const filteredBlogPosts = useMemo(
		() =>
			blogPostsWithViewCount.filter(
				(post) =>
					($searchTerm === "" ||
						post.data.title.toLowerCase().includes($searchTerm.toLowerCase()) ||
						post.data.description
							.toLowerCase()
							.includes($searchTerm.toLowerCase()) ||
						post.data.tags.some(
							(tag) =>
								tag.toLowerCase().includes($searchTerm.toLowerCase()) ||
								`#${tag.toLowerCase()}`.includes($searchTerm.toLowerCase()),
						)) &&
					($selectedTag === BLOG_FILTER_TAG_ALL_VALUE ||
						post.data.tags.includes($selectedTag)),
			),
		[blogPostsWithViewCount, $selectedTag, $searchTerm],
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
	posts: BlogPostWithViewCount[];
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
	post: BlogPostWithViewCount;
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
				<motion.h2 className="text-lg" layout>
					{title}
				</motion.h2>
				<motion.p layout className="text-neutral-200">
					{description}
				</motion.p>
			</div>

			<hr className="border-neutral-800 transition-colors group-hover:border-neutral-700" />

			<div className="flex flex-wrap justify-between gap-4 text-neutral-400 text-xs">
				<p>{tags.map((tag) => `#${tag}`).join(", ")}</p>

				<div className="flex flex-wrap gap-4">
					{isLoading ? (
						<Skeleton className="w-[8ch]" />
					) : (
						<p className="inline-block">{viewCount?.toLocaleString()} views</p>
					)}

					<p>{createdAt.toLocaleDateString("en-US")}</p>
				</div>
			</div>
		</motion.a>
	);
};
