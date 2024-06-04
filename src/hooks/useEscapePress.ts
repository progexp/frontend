import { useEffect } from 'react';

export const useEscapePress = (handler: (event: KeyboardEvent) => void) => {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handler(event);
            }
        };

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [handler]);
};
