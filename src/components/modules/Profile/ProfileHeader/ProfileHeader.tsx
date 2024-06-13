'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import Image from 'next/image';

import { Button } from '@/components';
import { ButtonIcons, ButtonTypes } from '@/enums';
import type { Profile } from '@shared/types';

type ProfileHeaderProps = {
    profile: Profile;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <div className={cn(style.profile__header)}>
            <div className={cn(style.header__user)}>
                <Image
                    src={'http://localhost:4200/static/headers/mortyhwk.jpeg'}
                    className={cn(style.user__header)}
                    alt="Шапка"
                    width={1000}
                    height={262}
                />
                <Image
                    src={profile?.avatar || 'http://localhost:4200/static/avatars/default.jpg'}
                    className={cn(style.user__avatar)}
                    alt="Аватар"
                    width={180}
                    height={180}
                />
                <div className={cn(style.user__info)}>
                    <div className={cn(style.user__username)}>{profile.login}</div>
                    <div className={cn(style.user__status)}>Ауф!</div>
                </div>
            </div>
            <div className={cn(style.header__edit)}>
                <div className={cn(style.edit__wrapper)}>
                    <Button onClick={null} icon={ButtonIcons.Pencil} type={ButtonTypes.Dark}>
                        Изменить обложку
                    </Button>
                </div>
                <div className={cn(style.edit__profile)}>
                    <Button onClick={null} type={ButtonTypes.Dark}>
                        Изменить профиль
                    </Button>
                </div>
            </div>
        </div>
    );
}
