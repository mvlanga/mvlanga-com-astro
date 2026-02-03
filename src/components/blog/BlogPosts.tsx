import { BlogPost } from "@/components/blog/BlogPost";
import {
	BLOG_FILTER_TAG_ALL_VALUE,
	blogFilterTag,
} from "@/components/blog/blogFilterStore";
import type { BlogPostWithViewCount } from "@/components/blog/types";
import {
	groupPostsByMonth,
	useBlogPostsWithViewCount,
} from "@/components/blog/utils";
import { Skeleton } from "@/components/common/Skeleton";
import { useStore } from "@nanostores/react";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	type Transition,
} from "motion/react";
import { useMemo } from "react";

export const layoutTransition: Transition = {
	duration: 0.5,
	ease: [0.27, 0.99, 0.25, 0.99],
};

type BlogPostsProps = { blogPosts: BlogPostWithViewCount[] };

const isSSR = import.meta.env.SSR;

export const BlogPosts = ({ blogPosts }: BlogPostsProps) => {
	const $selectedTag = useStore(blogFilterTag);

	const { isLoading, blogPostsWithViewCount } =
		useBlogPostsWithViewCount(blogPosts);

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
	posts: BlogPostWithViewCount[];
	isLoading: boolean;
};

const MotionBlogPost = motion.create(BlogPost);

const Area = ({ title, posts, isLoading }: AreaProps) => {
	return (
		<motion.div
			layout
			transition={layoutTransition}
			className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
			<motion.p
				layout
				className="col-span-full text-2xl"
				initial={{ opacity: isSSR ? 1 : 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={layoutTransition}>
				{title}
			</motion.p>
			<AnimatePresence propagate>
				{posts.map((post) => (
					<MotionBlogPost
						key={post.id}
						post={post}
						layout
						initial={{
							opacity: isSSR ? 1 : 0,
							scale: isSSR ? 1 : 0.8,
						}}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={layoutTransition}>
						{isLoading ? (
							<Skeleton className="w-[8ch]" />
						) : (
							<p className="inline-block">
								{post.viewCount?.toLocaleString()} views
							</p>
						)}
					</MotionBlogPost>
				))}
			</AnimatePresence>
		</motion.div>
	);
};
