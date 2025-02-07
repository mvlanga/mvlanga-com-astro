import { mix, useReducedMotion } from "motion/react";
import { type MouseEvent, useEffect, useRef } from "react";

export const PlayfulDivider = () => {
	const shouldReduceMotion = useReducedMotion() ?? true;

	return shouldReduceMotion ? (
		<hr className="border-neutral-800" />
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: hook is only used to run on mount
	useEffect(() => {
		console.log("ABC");
		setPath(progress);

		window.addEventListener("resize", () => {
			setPath(progress);
		});
	}, []);

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
		<div ref={containerEl} className="relative h-px w-full">
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="-top-5 hover:-top-20 relative z-10 h-10 w-full hover:h-40"
			/>

			<svg className="absolute top-[-250px] h-[500px] w-full">
				<path
					ref={pathEl}
					className="fill-none stroke-[1px] stroke-neutral-800"
				/>
			</svg>
		</div>
	);
};
