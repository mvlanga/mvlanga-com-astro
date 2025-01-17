import {useState} from 'react';
import {useEscapeKey} from '@/utils/useEscapeKey';
import {AnimatePresence, motion} from 'motion/react';
import {useComponentSize} from 'react-use-size';
import {Button} from '@/components/Button';
import {clsx} from 'clsx';

type NavigationItems = { label: string; url: string }[];

export default function Header({currentPath}: { currentPath: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        ref: menuButtonElement,
        width: menuButtonElementWidth,
        height: menuButtonElementHeight,
    } = useComponentSize();

    useEscapeKey(() => isMenuOpen && setIsMenuOpen(false));

    function toggleMenu() {
        setIsMenuOpen((s) => !s);
    }

    const navItems: NavigationItems = [
        {
            label: 'Home',
            url: '/',
        },
        {
            label: 'Work',
            url: '/work',
        },
        {
            label: 'Resume',
            url: '/resume',
        },
        {
            label: 'Contact',
            url: 'mailto:morizvlanga@gmail.com',
        },
    ];

    const socialItems: NavigationItems = [
        {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/mvlanga',
        },
        {
            label: 'GitHub',
            url: 'https://github.com/mvlanga',
        },
    ];

    return (
        <>
            <header className="fixed left-10 top-10 z-10">
                <a aria-label="Moriz von Langa wordmark" href="/">
                    <Button text="mvlanga"/>
                </a>
            </header>
            <Button
                ref={menuButtonElement}
                level="secondary"
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
                className="fixed right-10 top-10 z-40"
                isActive={isMenuOpen}
                onClick={toggleMenu}
                text="menu"
                activeText="close"
                aria-label={isMenuOpen ? 'close main menu' : 'open main menu'}
            />
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
                            open: {opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 1rem)'},
                        }}
                        initial="initial"
                        animate="open"
                        exit="closed"
                        role="navigation"
                        aria-label="Main Menu"
                        className="fixed left-5 right-5 top-5 z-30 flex max-h-[calc(100%-2.5rem)] flex-col gap-10 overflow-y-auto rounded-2xl bg-neutral-800 px-8 py-10 md:left-auto md:w-72"
                        id="main-menu"
                    >
                        <div className="flex flex-col gap-4">
                            <motion.p
                                variants={{
                                    initial: {opacity: 0},
                                    closed: {opacity: 0},
                                    open: {opacity: 1, transition: {delay: 0.05}},
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
                                            when: 'beforeChildren',
                                            staggerChildren: 0.05,
                                            delayChildren: 0.1,
                                        },
                                    },
                                }}
                            >
                                {navItems.map(({label, url}) => (
                                    <motion.li
                                        key={url}
                                        variants={{
                                            initial: {opacity: 0, translateY: '50%'},
                                            closed: {opacity: 0, translateY: '0px'},
                                            open: {opacity: 1, translateY: '0px'},
                                        }}
                                        className="group relative text-2xl"
                                    >
                                        <a
                                            href={url}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center"
                                        >
                                            <div
                                                aria-hidden="true"
                                                className={clsx(
                                                    'absolute h-0.5 w-10 -translate-x-14 scale-x-0 rounded-xl bg-neutral-500 opacity-0 transition-all group-hover:scale-x-100 group-hover:opacity-100',
                                                    url === currentPath && 'opacity-100',
                                                    url === currentPath && 'scale-x-100'
                                                )}
                                            ></div>
                                            {label}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <motion.p
                                variants={{
                                    initial: {opacity: 0},
                                    closed: {opacity: 0},
                                    open: {opacity: 1, transition: {delay: 0.2}},
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
                                            when: 'beforeChildren',
                                            staggerChildren: 0.05,
                                            delayChildren: 0.25,
                                        },
                                    },
                                }}
                            >
                                {socialItems.map(({label, url}) => (
                                    <motion.li
                                        key={url}
                                        variants={{
                                            initial: {opacity: 0},
                                            closed: {opacity: 0},
                                            open: {opacity: 1},
                                        }}
                                    >
                                        <a
                                            href={url}
                                            referrerPolicy="no-referrer"
                                            target="_blank"
                                            onClick={() => setIsMenuOpen(false)}
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
            {isMenuOpen && (
                <div
                    className="fixed bottom-0 left-0 right-0 top-0 z-20"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
        </>
    );
}
