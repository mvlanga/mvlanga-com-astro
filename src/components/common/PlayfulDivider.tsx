import { mix } from "motion/react";
import { type MouseEvent, useRef } from "react";
import { useOnMount } from "@/utils/useOnMount.ts";
import { useOnResize } from "@/utils/useOnResize.ts";
import { useUsersReducedMotionPreference } from "@/utils/useUsersReducedMotionPreference.ts";

export const PlayfulDivider = () => {
	const shouldReduceMotion = useUsersReducedMotionPreference();

	return shouldReduceMotion ? (
		<hr className="border-neutral-800 light:border-neutral-300" />
	) : (
		<ReactiveLine />
	);
};

const ReactiveLine = () => {
	const containerEl = useRef<HTMLDivElement>(null);
	const pathEl = useRef<SVGPathElement>(null);

	let progress = 0;
	let x = 0.5;
	let time = Math.PI / 2;
	let reqId: number | null = null;

	const setPath = (progress: number) => {
		if (containerEl.current === null || pathEl.current === null) {
			return;
		}

		const width = containerEl.current.offsetWidth ?? 0;

		pathEl.current.setAttribute(
			"d",
			`M0 250 Q${width * x} ${250 + progress}, ${width} 250`,
		);
	};

	useOnMount(() => setPath(progress));
	useOnResize(() => setPath(progress));

	const manageMouseEnter = () => {
		if (reqId) {
			cancelAnimationFrame(reqId);
			resetAnimation();
		}
	};

	const manageMouseMove = (e: MouseEvent) => {
		if (pathEl.current === null) {
			return;
		}

		const { movementY, clientX } = e;

		const pathBound = pathEl.current.getBoundingClientRect();

		if (pathBound) {
			x = (clientX - pathBound.left) / pathBound.width;
			progress += movementY;
			setPath(progress);
		}
	};

	const manageMouseLeave = () => {
		animateOut();
	};

	const animateOut = () => {
		const newProgress = progress * Math.sin(time);

		progress = mix(progress, 0, 0.05);

		time += 0.2;

		setPath(newProgress);

		if (Math.abs(progress) > 0.75) {
			reqId = requestAnimationFrame(animateOut);
		} else {
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		time = Math.PI / 2;
		progress = 0;
	};

	return (
		<div ref={containerEl} className="group relative h-px w-full" aria-hidden>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: hidden for screen readers */}
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="-top-5 hover:-top-20 relative z-10 h-10 w-full hover:h-40"
			/>

			{/* biome-ignore lint/a11y/noSvgWithoutTitle: hidden for screen readers */}
			<svg className="pointer-events-none absolute top-[-250px] h-[500px] w-full">
				<path
					ref={pathEl}
					className="fill-none light:stroke-neutral-300 stroke-[1px] stroke-neutral-800 transition-colors duration-300 group-hover:stroke-neutral-700 light:group-hover:stroke-neutral-400"
				/>
			</svg>
		</div>
	);
};
