import './styles.scss';

import type { Metadata, Viewport } from 'next';
import type { ChildrenProps } from '@/types';

import {
    Header,
    NavigationBar,
    Footer,
    QueryProvider,
    Notifications,
    RootProvider
} from '@/components';

export const metadata: Metadata = {
    title: 'ProgExp - передовое приложение для коммуникации программистов',
    description: 'ProgExp - передовое приложение для коммуникации программистов'
};

export const viewport: Viewport = {
    colorScheme: 'dark'
};

export default function RootLayout({ children }: ChildrenProps) {
    return (
        <html lang="ru">
            <body>
                <RootProvider>
                    <QueryProvider>
                        <Header />
                        <NavigationBar />
                        {children}
                        <Notifications />
                        <Footer />
                    </QueryProvider>
                </RootProvider>
            </body>
        </html>
    );
}
