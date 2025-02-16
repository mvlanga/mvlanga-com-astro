import mvlPortait from "@/assets/moriz-von-langa-portrait.webp";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

export const PortraitVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const isInView = useInView(videoRef);

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
		<div className="md:col-start-2 md:col-end-6">
			<video
				preload="auto"
				ref={videoRef}
				src="moriz-von-langa-portrait.mp4"
				poster={mvlPortait.src}
				muted
				playsInline
				className="max-h-[140vh] w-auto"
			/>
		</div>
	);
};
