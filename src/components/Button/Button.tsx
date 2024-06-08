'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import type { ChildrenProps } from '@/types';
import { ButtonTypes } from '@/enums';

interface ButtonProps extends ChildrenProps {
    onClick: () => void;
    type?: ButtonTypes;
}

const styleTypesMap = new Map<ButtonTypes, string>([
    [ButtonTypes.Default, style['button--default']],
    [ButtonTypes.Transparent, style['button--transparent']]
]);

export default function Button({ onClick, type = ButtonTypes.Default, children }: ButtonProps) {
    return (
        <button onClick={onClick} className={cn(style.button, styleTypesMap.get(type))}>
            {children}
        </button>
    );
}
