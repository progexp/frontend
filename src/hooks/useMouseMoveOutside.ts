import { useEffect, RefObject } from 'react';

export const useMouseMoveOutside = (
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent) => void,
    buffer: number = 100
) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current) {
                return;
            }

            const containerRect = ref.current.getBoundingClientRect();
            if (
                event.clientY < containerRect.top - buffer ||
                event.clientY > containerRect.bottom + buffer ||
                event.clientX < containerRect.left - buffer ||
                event.clientX > containerRect.right + buffer
            ) {
                handler(event);
            }
        };

        document.addEventListener('mousemove', listener);

        return () => {
            document.removeEventListener('mousemove', listener);
        };
    }, [ref, handler, buffer]);
};
