import {clsx} from 'clsx';
import {motion} from 'motion/react';
import {twMerge} from 'tailwind-merge';
import {
    PerspectiveTextHover, type PerspectiveTextHoverProps,
} from './PerspectiveTextHover';
import type {AriaAttributes, Ref, SyntheticEvent} from "react";

type ButtonProps = {
    ref?: Ref<HTMLButtonElement>;
    level?: 'primary' | 'secondary';
    className?: string;
    onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
} & PerspectiveTextHoverProps &
    Partial<AriaAttributes>;

export const Button = ({
                           text,
                           activeText,
                           ref,
                           level = 'primary',
                           isActive = false,
                           className: additionalClasses,
                           onClick,
                           ...ariaAttributes
                       }: ButtonProps) => {
    return (
        <motion.button
            initial="default"
            animate={isActive ? 'active' : 'default'}
            whileHover="hover"
            ref={ref}
            className={twMerge(
                clsx(
                    'relative flex items-center justify-center overflow-hidden rounded-3xl px-8 py-4 text-white',
                    level === 'primary' && 'bg-purple',
                    level === 'secondary' && 'bg-neutral-800',
                    additionalClasses
                )
            )}
            onClick={onClick}
            {...ariaAttributes}
        >
            <motion.div
                transition={{duration: 0.2, ease: 'easeOut'}}
                variants={{
                    default: {
                        translateY: '100%',
                    },
                    active: {
                        translateY: '0',
                    },
                    hover: {
                        translateY: '0',
                    },
                }}
                className={clsx(
                    'absolute h-[200%] w-[150%] rounded-[50%] bg-purple-600'
                )}
            ></motion.div>
            <PerspectiveTextHover
                className="justify-center"
                text={text}
                activeText={activeText}
                isActive={isActive}
            />
        </motion.button>
    );
};
