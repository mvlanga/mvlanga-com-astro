import { motion, useScroll, useTransform } from "motion/react";
import { type PropsWithChildren, useRef } from "react";

export const RotatingFlower = ({ children }: PropsWithChildren) => {
	const ref = useRef<null | HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
	});

	console.log(scrollYProgress);

	const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

	return (
		<motion.div
			ref={ref}
			className="inline-flex h-16 w-16"
			style={{
				rotate,
			}}>
			{children}
		</motion.div>
	);
};
