import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
	type Variants,
} from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useComponentSize } from "react-use-size";
import { Button } from "@/components/common/Button";
import { HeaderNavItem } from "@/components/header/HeaderNavItem";
import { ThemeToggleButton } from "@/components/header/ThemeToggleButton";
import { useEscapeKey } from "@/utils/useEscapeKey";
import { useIsBreakpointSm } from "@/utils/useMediaQuery.ts";

type NavigationItems = { label: string; url: string }[];

const navItems: NavigationItems = [
	{
		label: "Home",
		url: "/#home",
	},
	{
		label: "About",
		url: "/#about",
	},
	{
		label: "Experience",
		url: "/#experience",
	},
	{
		label: "Highlights",
		url: "/#highlights",
	},
	{
		label: "Blog",
		url: "/blog",
	},
	{
		label: "Contact",
		url: "mailto:morizvlanga@gmail.com",
	},
];

const socialItems: NavigationItems = [
	{
		label: "LinkedIn",
		url: "https://www.linkedin.com/in/mvlanga",
	},
	{
		label: "GitHub",
		url: "https://github.com/mvlanga",
	},
	{
		label: "Mastodon",
		url: "https://mastodon.social/@mvlanga",
	},
];

export const Header = ({ currentPath }: { currentPath: string }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const {
		ref: menuButtonElement,
		width: menuButtonElementWidth,
		height: menuButtonElementHeight,
	} = useComponentSize();
	const isBreakpointSm = useIsBreakpointSm();

	const { scrollY } = useScroll();
	const [isHeaderHidden, setIsHeaderHidden] = useState(scrollY.get() >= 100);

	const [activeNavItems, setActiveNavItems] = useState<string[]>([]);
	const latestActiveNavItem = activeNavItems[activeNavItems.length - 1];

	useMotionValueEvent(scrollY, "change", (current) => {
		setIsMenuOpen(false);
		const diff = current - (scrollY.getPrevious() ?? 0);
		const direction = diff > 0 ? "down" : "up";
		setIsHeaderHidden(direction === "down" && scrollY.get() >= 100);
	});

	useEscapeKey(() => isMenuOpen && setIsMenuOpen(false));

	const onAfterRouteChange = useCallback(() => {
		setIsHeaderHidden(false);
	}, []);

	useEffect(() => {
		document.addEventListener("astro:after-swap", onAfterRouteChange);

		return () =>
			document.removeEventListener("astro:after-swap", onAfterRouteChange);
	}, [onAfterRouteChange]);

	function toggleMenu() {
		setIsMenuOpen((s) => !s);
	}

	const currentVariant = isHeaderHidden ? "hidden" : "visible";
	const variants: Variants = {
		visible: {
			opacity: 1,
			pointerEvents: "all",
			scale: 1,
			translateY: "0",
		},
		hidden: {
			opacity: 0,
			pointerEvents: "none",
			scale: 0.8,
			translateY: "-100%",
		},
	};

	return (
		<>
			{isHeaderHidden && (
				<div
					aria-hidden={true}
					className="fixed top-0 right-0 left-0 z-50 h-5"
					onMouseEnter={() => setIsHeaderHidden(false)}
				/>
			)}

			<motion.header
				className="fixed top-4 left-4 z-10 sm:top-10 sm:left-10"
				initial="visible"
				animate={currentVariant}
				variants={variants}
				onFocus={() => setIsHeaderHidden(false)}
			>
				<a aria-label="Moriz von Langa wordmark" href="/">
					<Button text="mvlanga" />
				</a>
			</motion.header>

			<motion.div
				initial="visible"
				className="fixed top-4 right-4 z-40 flex gap-2 sm:top-10 sm:right-10"
				animate={currentVariant}
				variants={variants}
			>
				{isBreakpointSm && (
					<AnimatePresence>
						{!isMenuOpen && (
							<motion.div
								className="-z-10"
								initial={{ translateX: "100%", scale: 0.8 }}
								animate={{ translateX: 0, scale: 1 }}
								exit={{ translateX: "100%", scale: 0.8 }}
							>
								<ThemeToggleButton />
							</motion.div>
						)}
					</AnimatePresence>
				)}

				<Button
					ref={menuButtonElement}
					level="secondary"
					aria-expanded={isMenuOpen}
					aria-controls="main-menu"
					isActive={isMenuOpen}
					onClick={toggleMenu}
					onFocus={() => setIsHeaderHidden(false)}
					text="menu"
					activeText="close"
					aria-label={isMenuOpen ? "close main menu" : "open main menu"}
				/>
			</motion.div>

			<AnimatePresence>
				{!isBreakpointSm && !isHeaderHidden && (
					<motion.div
						exit={{ opacity: 0, translateY: "100%" }}
						initial={{ opacity: 0, translateY: "100%" }}
						animate={{ opacity: 1, translateY: "0" }}
						className="fixed right-4 bottom-4 z-10"
					>
						<ThemeToggleButton />
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.nav
						variants={{
							initial: {
								opacity: 0,
								clipPath: `inset(1.25rem 1.25rem calc(100% - ${menuButtonElementHeight}px - 1.25rem) calc(100% - ${menuButtonElementWidth}px - 1.25rem) round 1rem)`,
							},
							closed: {
								opacity: 0,
								clipPath: `inset(1.25rem 1.25rem calc(100% - ${menuButtonElementHeight}px - 1.25rem) calc(100% - ${menuButtonElementWidth}px - 1.25rem) round 1rem)`,
							},
							open: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 1rem)" },
						}}
						initial="initial"
						animate="open"
						exit="closed"
						aria-label="Main Menu"
						className="fixed top-2 right-2 left-2 z-30 flex max-h-[calc(100%-1rem)] flex-col gap-10 overflow-y-auto rounded-2xl bg-neutral-900 light:bg-neutral-100 px-8 py-10 sm:top-5 sm:right-5 sm:left-auto sm:w-72"
						id="main-menu"
					>
						<div className="flex flex-col gap-4">
							<motion.p
								variants={{
									initial: { opacity: 0 },
									closed: { opacity: 0 },
									open: { opacity: 1, transition: { delay: 0.05 } },
								}}
								className="text-sm"
							>
								Navigation
							</motion.p>
							<motion.ul
								className="flex flex-col gap-5"
								variants={{
									open: {
										transition: {
											when: "beforeChildren",
											staggerChildren: 0.05,
											delayChildren: 0.1,
										},
									},
								}}
							>
								{navItems.map(({ label, url }) => (
									<motion.li
										key={url}
										variants={{
											initial: { opacity: 0, translateY: "50%" },
											closed: { opacity: 0, translateY: "0px" },
											open: { opacity: 1, translateY: "0px" },
										}}
										className="group relative text-2xl"
									>
										<HeaderNavItem
											currentPath={currentPath}
											label={label}
											url={url}
											setIsMenuOpen={setIsMenuOpen}
											onActiveAnchorLinkChange={setActiveNavItems}
											isActive={
												url === currentPath ||
												latestActiveNavItem === url.substring(1)
											}
										/>
									</motion.li>
								))}
							</motion.ul>
						</div>
						<div className="flex flex-col gap-4">
							<motion.p
								variants={{
									initial: { opacity: 0 },
									closed: { opacity: 0 },
									open: { opacity: 1, transition: { delay: 0.2 } },
								}}
								className="text-sm"
							>
								Socials
							</motion.p>
							<motion.ul
								className="flex flex-wrap gap-4"
								variants={{
									open: {
										transition: {
											when: "beforeChildren",
											staggerChildren: 0.05,
											delayChildren: 0.25,
										},
									},
								}}
							>
								{socialItems.map(({ label, url }) => (
									<motion.li
										key={url}
										variants={{
											initial: { opacity: 0 },
											closed: { opacity: 0 },
											open: { opacity: 1 },
										}}
									>
										<a
											href={url}
											referrerPolicy="no-referrer"
											target="_blank"
											onClick={() => setIsMenuOpen(false)}
											rel="noreferrer"
											data-umami-event="link-click"
											data-umami-event-url={url}
										>
											{label}
										</a>
									</motion.li>
								))}
							</motion.ul>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						animate={{ opacity: 0.5 }}
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black sm:bg-transparent"
						onClick={() => setIsMenuOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	);
};
