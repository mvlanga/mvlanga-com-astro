import {motion} from 'motion/react';

export const ContactMe = () => {
    return (
        <motion.div className="fixed bottom-10 right-10" initial="default" whileHover="hover" whileTap="tap">
            <div
                className="absolute -left-8 -top-8 -right-8 -bottom-8 -z-10 tracking-widest animate-spin">
                <motion.svg
                    variants={{
                    default: {
                        scale: 1
                    },
                    hover: {
                        scale: 0.95
                    },
                    tap: {
                        scale: 1.1
                    }

                }}

                    className="absolute rotate-[72.5deg]"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <text>
                        <textPath href="#circlePath" startOffset="0%" className="fill-neutral-600 text-[0.5rem]">
                            -
                        </textPath>
                        <textPath href="#circlePath" startOffset="25%" className="fill-neutral-600 text-[0.5rem]">
                            -
                        </textPath>
                        <textPath href="#circlePath" startOffset="50%" className="fill-neutral-600 text-[0.5rem]">
                            -
                        </textPath>
                        <textPath href="#circlePath" startOffset="75%" className="fill-neutral-600 text-[0.5rem]">
                            -
                        </textPath>
                    </text>
                </motion.svg>
                <motion.svg
                    variants={{
                    default: {
                        scale: 1
                    },
                    hover: {
                        scale: 0.95
                    },
                    tap: {
                        scale: 1.1
                    }

                }}

                    className=""
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-transparent"
                        id="circlePath"
                        d="
      M 10, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -80,0
    "
                    />
                    <text>
                        <textPath href="#circlePath" startOffset="0%" className="fill-neutral-600 text-[0.5rem]">
                            contact
                        </textPath>
                        <textPath href="#circlePath" startOffset="25%" className="fill-neutral-600 text-[0.5rem]">
                            contact
                        </textPath>
                        <textPath href="#circlePath" startOffset="50%" className="fill-neutral-600 text-[0.5rem]">
                            contact
                        </textPath>
                        <textPath href="#circlePath" startOffset="75%" className="fill-neutral-600 text-[0.5rem]">
                            contact
                        </textPath>
                    </text>
                </motion.svg>
            </div>
            <motion.button
                className="w-28 h-28 overflow-hidden rounded-full bg-neutral-900"
                variants={{
                    default: {
                        scale: 1
                    },
                    hover: {
                        scale: 0.9
                    },
                    tap: {
                        scale: 0.8
                    }

                }}>
                <video className="object-cover h-full w-full translate-y-1 mix-blend-lighten" src="./mvlanga-memoji.mp4"
                       muted autoPlay loop
                       playsInline/>


            </motion.button>
        </motion.div>

    )
}