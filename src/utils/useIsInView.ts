import {type RefObject, useEffect, useState } from 'react';

export const useIsInView = (ref: RefObject<null | HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) =>
            entry && setIntersecting(entry.isIntersecting)
        );

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}