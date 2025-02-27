import {
	FullscreenButton,
	Gesture,
	MediaAnnouncer,
	MediaPlayer,
	MediaProvider,
	MuteButton,
	PlayButton,
	TimeSlider,
	VolumeSlider,
} from "@vidstack/react";
import { Controls } from "@vidstack/react";
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

import "@vidstack/react/player/styles/base.css";

type VideoPlayerProps = {
	src: string;
	poster: ImageMetadata;
	muted?: boolean;
};

export const VideoPlayer = ({
	src,
	poster,
	muted = true,
}: VideoPlayerProps) => {
	return (
		<MediaPlayer
			title="Sprite Fight"
			src={src}
			playsInline
			aspectRatio={`${poster.width / poster.height}`}
			className="relative overflow-hidden rounded-4xl"
			muted={muted}
		>
			<MediaProvider className="media-started:opacity-100 opacity-50 transition-opacity duration-200" />

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

			<Controls.Root className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity data-[visible]:opacity-100">
				<div className="flex-1" />
				<Controls.Group className="pointer-events-auto flex w-full items-center gap-4 p-8">
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
			<MediaAnnouncer />
		</MediaPlayer>
	);
};
