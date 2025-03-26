import { clsx } from "clsx";
import { motion } from "motion/react";
import { useState } from "react";

const possibleReactions = ["❤️", "😎", "👌", "😁"];

export const Reaction = () => {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{possibleReactions.map((reaction) => (
				<ReactionItem key={reaction} emoji={reaction} initialCount={9} />
			))}
		</div>
	);
};

const ReactionItem = ({
	emoji,
	initialCount,
}: { emoji: string; initialCount: number }) => {
	const [liked, setLiked] = useState(false);
	const [count, setCount] = useState(initialCount);

	const handleClick = () => {
		console.log(liked, count);
		if (liked) {
			setCount((c) => c - 1);
			setLiked(false);
		} else {
			setCount((c) => c + 1);
			setLiked(true);
		}
	};

	return (
		<motion.button
			layout
			className={clsx(
				"flex items-center gap-2 rounded-full bg-neutral-800 px-6 py-3 transition-colors",
				liked && "bg-purple",
			)}
			onClick={handleClick}
		>
			<span className="text-2xl">{emoji}</span>

			<motion.span className="font-bold">{count}</motion.span>
		</motion.button>
	);
};
