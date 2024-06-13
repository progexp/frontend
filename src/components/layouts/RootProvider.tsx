'use client';

import { createContext, useState } from 'react';
import type { ChildrenProps } from '@/types';
import type { Profile } from '@shared/types';

type RootContextType = {
    profile: Profile;
    setProfile: (value: Profile) => void;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const RootContext = createContext<RootContextType>(undefined);

export default function RootProvider({ children }: ChildrenProps) {
    const [profile, setProfile] = useState({} as Profile);

    return <RootContext.Provider value={{ profile, setProfile }}>{children}</RootContext.Provider>;
}
