import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export const ContactMe = () => {
	const { scrollY } = useScroll();
	const [isContactButtonHidden, setIsContactButtonHidden] = useState(
		scrollY.get() < 100,
	);

	useMotionValueEvent(scrollY, "change", (current) => {
		setIsContactButtonHidden(scrollY.get() < 100);
	});

	return (
		<motion.div
			className="fixed bottom-10 right-10 hidden md:block select-none"
			initial="hidden"
			whileHover="hover"
			whileTap="tap"
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
			}}
		>
			<div className=" -left-8 -top-8 -right-8 -bottom-8 -z-10 tracking-widest absolute animate-spin">
				<motion.div
					className="absolute top-0 left-0 right-0 bottom-0"
					variants={{
						default: {
							scale: 1,
						},
						hover: {
							scale: 0.95,
						},
						tap: {
							scale: 0,
						},
					}}
				>
					<svg
						className="rotate-[72.5deg]"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<text>
							<textPath
								href="#circlePath"
								startOffset="0%"
								className="fill-neutral-600 text-[0.5rem]"
							>
								-
							</textPath>
							<textPath
								href="#circlePath"
								startOffset="25%"
								className="fill-neutral-600 text-[0.5rem]"
							>
								-
							</textPath>
							<textPath
								href="#circlePath"
								startOffset="50%"
								className="fill-neutral-600 text-[0.5rem]"
							>
								-
							</textPath>
							<textPath
								href="#circlePath"
								startOffset="75%"
								className="fill-neutral-600 text-[0.5rem]"
							>
								-
							</textPath>
						</text>
					</svg>
				</motion.div>

				<motion.svg
					variants={{
						default: {
							scale: 1,
						},
						hover: {
							scale: 0.95,
						},
						tap: {
							scale: 0,
						},
					}}
					className=""
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
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
						<textPath
							href="#circlePath"
							startOffset="0%"
							className="fill-neutral-600 text-[0.5rem]"
						>
							contact
						</textPath>
						<textPath
							href="#circlePath"
							startOffset="25%"
							className="fill-neutral-600 text-[0.5rem]"
						>
							contact
						</textPath>
						<textPath
							href="#circlePath"
							startOffset="50%"
							className="fill-neutral-600 text-[0.5rem]"
						>
							contact
						</textPath>
						<textPath
							href="#circlePath"
							startOffset="75%"
							className="fill-neutral-600 text-[0.5rem]"
						>
							contact
						</textPath>
					</text>
				</motion.svg>
			</div>
			<motion.a
				href="mailto:morizvlanga@gmail.com"
				className="block w-28 h-28 overflow-hidden rounded-full bg-neutral-900"
				variants={{
					default: {
						scale: 1,
					},
					hover: {
						scale: 0.9,
					},
					tap: {
						scale: 1.2,
					},
				}}
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
			</motion.a>
		</motion.div>
	);
};
