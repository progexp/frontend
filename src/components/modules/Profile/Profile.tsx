'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import { useQuery } from '@tanstack/react-query';
import { AccountsMutationKey, ButtonIcons, ButtonTypes } from '@/enums';
import { AccountsService } from '@/services';
import { useLayoutEffect, useState } from 'react';

import type { Profile as ProfileType } from '@shared/types';
import Image from 'next/image';

import { Button, ProfileHeader } from '@/components';
import Statistics from '@/components/modules/Profile/Statistics/Statistics';

type ProfileProps = {
    id: number;
};

export default function Profile({ id }: ProfileProps) {
    const [profile, setProfile] = useState<ProfileType>();

    const { data } = useQuery({
        queryKey: [AccountsMutationKey.GetProfile],
        queryFn: () => AccountsService.getProfile(id)
    });

    useLayoutEffect(() => {
        if (data) {
            setProfile(data);
        }
    }, [data, setProfile]);

    return (
        <div className={cn(style.profile)}>
            <div className={cn(style.profile__inner)}>
                {profile?.id ? (
                    <>
                        <ProfileHeader profile={profile} />
                        <Statistics profileId={profile.id} />
                    </>
                ) : (
                    <div>Аккаунт не найден</div>
                )}
            </div>
        </div>
    );
}
