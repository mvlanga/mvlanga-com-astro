import {mix} from "motion/react";
import {useEffect, useRef} from "react";

interface MouseEvent {
    movementY: number;
    clientX: number;
}

export const PlayfulDivider = () => {
    const containerEl = useRef<HTMLDivElement>(null);
    const pathEl = useRef<SVGPathElement>(null);

    let progress = 0;
    let x = 0.5;
    let time = Math.PI / 2;
    let reqId: number | null = null;

    // biome-ignore lint/correctness/useExhaustiveDependencies: hook is used to run on mount
    useEffect(() => {
        setPath(progress);

        window.addEventListener('resize', () => {
            setPath(progress);
        })
    }, [])

    const setPath = (progress: number) => {
        if (containerEl.current === null || pathEl.current === null) {
            return
        }

        const width = containerEl.current.offsetWidth ?? 0;

        pathEl.current.setAttribute(
            "d",
            `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
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
            return
        }

        const {movementY, clientX} = e;

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

        progress = mix(progress, 0, 0.05)

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
        <div ref={containerEl} className="relative w-full h-px">
            <div
                onMouseEnter={manageMouseEnter}
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
                className="relative z-10 h-10 w-full -top-5 hover:h-40 hover:-top-20"/>

            <svg className="absolute w-full h-[500px] top-[-250px]">
                <path
                    ref={pathEl}
                    className="stroke-neutral-800 stroke-[1px] fill-none"
                />
            </svg>
        </div>
    );
}