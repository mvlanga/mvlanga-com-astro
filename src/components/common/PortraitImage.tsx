import mvlPortrait from "@/assets/img/moriz-von-langa-portrait.webp";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const aspectRatio = mvlPortrait.width / mvlPortrait.height;

export const PortraitImage = () => {
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
		["calc(var(--spacing) * -24)", "calc(var(--spacing) * 24)"],
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
		<div className="md:col-span-4">
			<div
				ref={containerRef}
				style={{ aspectRatio }}
				className="relative max-h-lvh overflow-hidden rounded-2xl md:ml-auto"
			>
				<motion.img
					style={{ y: videoOffset }}
					className="-top-48 absolute inset-0 h-[calc(100%+var(--spacing)*32*2)] object-cover"
					width={mvlPortrait.width}
					height={mvlPortrait.height}
					src={mvlPortrait.src}
					alt="Portrait of Moriz von Langa"
				/>
			</div>
		</div>
	);
};
