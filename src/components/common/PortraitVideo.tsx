import mvlPortait from "@/assets/img/moriz-von-langa-portrait.jpg";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const aspectRatio = mvlPortait.width / mvlPortait.height;

export const PortraitVideo = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isInView = useInView(videoRef);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const videoOffset = useTransform(
		scrollYProgress,
		[0, 1],
		["calc(var(--spacing) * -32)", "calc(var(--spacing) * 32)"],
	);

	useEffect(() => {
		if (videoRef.current === null) {
			return;
		}

		if (isInView) {
			if (videoRef.current.paused || videoRef.current.ended) {
				videoRef.current.play();
			}
		} else {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	}, [isInView]);

	return (
		<div className="lg:col-span-4">
			<div
				ref={containerRef}
				style={{ aspectRatio }}
				className="relative overflow-hidden md:max-h-lvh lg:ml-auto"
			>
				<motion.img
					style={{ y: videoOffset }}
					className="-top-64 absolute inset-0 h-[calc(100%+var(--spacing)*32*2)] object-cover"
					width={mvlPortait.width}
					height={mvlPortait.height}
					src="moriz-von-langa-portrait_2.png"
				/>
			</div>
		</div>
	);
};
