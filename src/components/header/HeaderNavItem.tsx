import { useOnMount } from "@/utils/useOnMount.ts";
import { clsx } from "clsx";
import { scroll } from "motion";
import { inView } from "motion/react";
import type { Dispatch, SetStateAction } from "react";

type HeaderNavItemProps = {
	currentPath: string;
	url: string;
	label: string;
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
	onActiveAnchorLinkChange: Dispatch<SetStateAction<string[]>>;
	isActive: boolean;
};

type NavItemProps = Omit<HeaderNavItemProps, "currentPath">;

export const HeaderNavItem = (props: HeaderNavItemProps) => {
	if (props.url.includes("#")) {
		return <AnchorNavItem {...props} />;
	}

	return <NavItem {...props} />;
};

const AnchorNavItem = (props: NavItemProps) => {
	useOnMount(() =>
		scroll(() => {
			inView(props.url.substring(1), () => {
				const anchorEl = props.url.substring(1);

				props.onActiveAnchorLinkChange((current) => {
					if (current.includes(anchorEl)) {
						return current;
					}

					return [...current, anchorEl];
				});

				return () => {
					props.onActiveAnchorLinkChange((current) => {
						return current.filter((a) => a !== anchorEl);
					});
				};
			});
		}),
	);

	return <NavItem {...props} />;
};

const NavItem = ({ isActive, setIsMenuOpen, label, url }: NavItemProps) => {
	return (
		<a
			href={url}
			data-umami-event="link-click"
			data-umami-event-url={url}
			onClick={() => setIsMenuOpen(false)}
			className="flex items-center"
		>
			<div
				aria-hidden="true"
				className={clsx(
					"-translate-x-14 absolute h-0.5 w-10 scale-x-0 rounded-xl bg-neutral-600 opacity-0 transition-all group-hover:scale-x-100 group-hover:opacity-100 dark:bg-neutral-500",
					isActive && "opacity-100",
					isActive && "scale-x-100",
				)}
			/>
			{label}
		</a>
	);
};
