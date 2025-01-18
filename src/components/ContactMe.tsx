import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function ContactMe() {
	const { scrollY } = useScroll();
	const [isContactButtonHidden, setIsContactButtonHidden] = useState(
		scrollY.get() <= 100,
	);

	useMotionValueEvent(scrollY, "change", (current) => {
		setIsContactButtonHidden(scrollY.get() <= 100);
	});

	return (
		<motion.div
			className="fixed bottom-10 right-10 hidden md:block select-none"
			initial="hidden"
			whileHover="hover"
			animate={isContactButtonHidden ? "hidden" : "default"}
			variants={{
				default: {
					opacity: 1,
					scale: 1,
				},
				hidden: {
					opacity: 0,
					scale: 0.8,
				},
				hover: {
					scale: 0.95,
				},
			}}
		>
			<div className="-left-8 -top-8 -right-8 -bottom-8 -z-10 pointer-events-none fill-neutral-600 text-[0.5rem] tracking-widest absolute animate-spin">
				<svg
					className="absolute top-0 left-0 right-0 bottom-0 rotate-[72.5deg]"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<text>
						<textPath href="#circlePath" startOffset="0%">
							-
						</textPath>
						<textPath href="#circlePath" startOffset="25%">
							-
						</textPath>
						<textPath href="#circlePath" startOffset="50%">
							-
						</textPath>
						<textPath href="#circlePath" startOffset="75%">
							-
						</textPath>
					</text>
				</svg>
				<svg
					className=""
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						className="fill-transparent"
						id="circlePath"
						d="
      M 10, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -80,0
    "
					/>
					<text>
						<textPath href="#circlePath" startOffset="0%">
							contact
						</textPath>
						<textPath href="#circlePath" startOffset="25%">
							contact
						</textPath>
						<textPath href="#circlePath" startOffset="50%">
							contact
						</textPath>
						<textPath href="#circlePath" startOffset="75%">
							contact
						</textPath>
					</text>
				</svg>
			</div>
			<a
				aria-label="Contact me via mail"
				href="mailto:morizvlanga@gmail.com"
				className="block w-28 h-28 overflow-hidden rounded-full bg-neutral-900 drop-shadow-2xl"
			>
				<video
					className="object-cover h-full w-full translate-y-1 mix-blend-lighten"
					preload={isContactButtonHidden ? "none" : "auto"}
					src="/mvlanga-memoji.mp4"
					muted
					autoPlay
					loop
					playsInline
				/>
			</a>
		</motion.div>
	);
}
