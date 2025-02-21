import mvlPortait from "@/assets/img/moriz-von-langa-portrait.jpg";
import {motion, useInView, useScroll, useTransform} from "motion/react";
import {useEffect, useRef} from "react";

const aspectRatio = mvlPortait.width / mvlPortait.height;

export const PortraitVideo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(videoRef);

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const videoOffset = useTransform(scrollYProgress, [0, 1], [-128, 128]);

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
        <div
            ref={containerRef}
            style={{aspectRatio}}
            className="relative col-span-4 max-h-[120lvh] overflow-hidden bg-red-500"
        >
            <motion.video
                style={{y: videoOffset}}
                className="-top-32 absolute right-0 left-0 h-[calc(100%+16rem)] object-cover"
                preload="auto"
                ref={videoRef}
                src="moriz-von-langa-portrait.mp4"
                width={mvlPortait.width}
                height={mvlPortait.height}
                poster={mvlPortait.src}
                muted
                playsInline
                autoPlay
            />
        </div>
    );
};
