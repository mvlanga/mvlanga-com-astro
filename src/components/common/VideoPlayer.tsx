import { useOnMount } from "@/utils/useOnMount.ts";
import {
	Controls,
	FullscreenButton,
	Gesture,
	MediaAnnouncer,
	MediaPlayer,
	type MediaPlayerInstance,
	MediaProvider,
	MuteButton,
	PlayButton,
	Poster,
	TimeSlider,
	VolumeSlider,
} from "@vidstack/react";
import {
	FullscreenExitIcon,
	FullscreenIcon,
	MuteIcon,
	PauseIcon,
	PlayIcon,
	VolumeHighIcon,
	VolumeLowIcon,
} from "@vidstack/react/icons";
import type { ImageMetadata } from "astro";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

export type VideoPlayerProps = {
	src: string;
	poster: ImageMetadata;
	muted: boolean;
	alt: string;
	description?: string;
};

export const VideoPlayer = ({
	src,
	poster,
	muted,
	alt,
	description,
}: VideoPlayerProps) => {
	const videoRef = useRef<MediaPlayerInstance>(null);
	const videoElementRef = useRef<HTMLElement>(null);

	useOnMount(() => {
		if (videoRef.current?.el) {
			videoElementRef.current = videoRef.current.el;
		}
	});

	const isInView = useInView(videoElementRef);

	useEffect(() => {
		if (videoRef.current === null) {
			return;
		}

		if (!isInView) {
			videoRef.current.pause();
		}
	}, [isInView]);

	return (
		<div>
			<MediaPlayer
				ref={videoRef}
				aria-label={alt}
				src={src}
				playsInline
				aspectRatio={`${poster.width / poster.height}`}
				className="relative w-full overflow-hidden rounded-4xl"
				muted={muted}
			>
				<MediaProvider className="light:opacity-75 media-started:opacity-100 opacity-50 transition-opacity duration-200">
					<Poster
						className="absolute inset-0 block h-full w-full rounded-md bg-neutral-900 light:bg-neutral-200 opacity-0 transition-opacity data-[loading]:animate-pulse data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
						src={poster.src}
						alt={alt}
					/>
				</MediaProvider>

				<VideoPlayerGestures />

				<VideoPlayerControls muted={muted} />

				<MediaAnnouncer />
			</MediaPlayer>

			{description && (
				<p className="mt-4 text-center light:text-neutral-800 text-neutral-300">
					{description}
				</p>
			)}
		</div>
	);
};

const VideoPlayerGestures = () => {
	return (
		<>
			<Gesture
				className="absolute inset-0 z-10 block h-full w-full"
				event="pointerup"
				action="toggle:paused"
			/>
			<Gesture
				className="absolute inset-0 z-10 block h-full w-full"
				event="dblpointerup"
				action="toggle:fullscreen"
			/>
		</>
	);
};

const VideoPlayerControls = ({ muted }: { muted: boolean }) => {
	return (
		<Controls.Root className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity data-[visible]:opacity-100">
			<div className="flex-1" />
			<div className="flex-1" />

			<Controls.Group className="pointer-events-auto flex media-started:hidden w-full justify-center">
				<PlayButton className="group relative inline-flex h-18 w-18 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-purple">
					<PlayIcon className="h-16 w-16 " />
				</PlayButton>
			</Controls.Group>

			<div className="flex-1" />
			<div className="media-starte:hidden flex-1" />

			<Controls.Group className="pointer-events-auto media-started:flex hidden w-full items-center gap-4 p-8">
				<PlayButton className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-purple">
					<PlayIcon className="hidden h-8 w-8 group-data-[paused]:block" />
					<PauseIcon className="h-8 w-8 group-data-[paused]:hidden" />
				</PlayButton>

				{!muted && (
					<>
						<MuteButton className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-purple">
							<MuteIcon className="hidden h-8 w-8 group-data-[state='muted']:block" />
							<VolumeLowIcon className="hidden h-8 w-8 group-data-[state='low']:block" />
							<VolumeHighIcon className="hidden h-8 w-8 group-data-[state='high']:block" />
						</MuteButton>
						<VolumeSlider.Root className="group relative inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
							<VolumeSlider.Track className="relative z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
								<VolumeSlider.TrackFill className="absolute h-full w-[var(--slider-fill)] rounded-sm bg-purple will-change-[width]" />
							</VolumeSlider.Track>
							<VolumeSlider.Thumb className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-[var(--slider-fill)] z-20 h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
						</VolumeSlider.Root>
					</>
				)}

				<TimeSlider.Root className="group relative inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
					<TimeSlider.Track className="relative z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
						<TimeSlider.TrackFill className="absolute h-full w-[var(--slider-fill)] rounded-sm bg-purple will-change-[width]" />
						<TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)] rounded-sm bg-white/50 will-change-[width]" />
					</TimeSlider.Track>
					<TimeSlider.Thumb className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-[var(--slider-fill)] z-20 h-[15px] w-[15px] rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
				</TimeSlider.Root>

				<FullscreenButton className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4">
					<FullscreenIcon className="h-8 w-8 group-data-[active]:hidden" />
					<FullscreenExitIcon className="hidden h-8 w-8 group-data-[active]:block" />
				</FullscreenButton>
			</Controls.Group>
		</Controls.Root>
	);
};
