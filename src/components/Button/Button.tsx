'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import type { ChildrenProps } from '@/types';
import { ButtonIcons, ButtonTypes } from '@/enums';
import Image from 'next/image';

interface ButtonProps extends ChildrenProps {
    onClick: () => void;
    type?: ButtonTypes;
    icon?: ButtonIcons;
}

const styleTypesMap = new Map<ButtonTypes, string>([
    [ButtonTypes.Default, style['button--default']],
    [ButtonTypes.Transparent, style['button--transparent']],
    [ButtonTypes.Dark, style['button--dark']]
]);

export default function Button({
    onClick,
    type = ButtonTypes.Default,
    icon,
    children
}: ButtonProps) {
    return (
        <button onClick={onClick} className={cn(style.button, styleTypesMap.get(type))}>
            {icon && <Image src={icon} alt={icon} width={25} height={25} />}
            {children}
        </button>
    );
}
