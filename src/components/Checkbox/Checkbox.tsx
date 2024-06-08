'use client';

import cn from 'classnames';
import style from './styles.module.scss';

import type { ChildrenProps } from '@/types';

interface CheckboxProps extends ChildrenProps {
    isChecked: boolean;
    setChecked: (newValue: boolean) => void;
}

export default function Checkbox({ children, isChecked, setChecked }: CheckboxProps) {
    function handleClick(): void {
        setChecked(!isChecked);
    }

    return (
        <div className={cn(style.checkbox, isChecked && style.active)} onClick={handleClick}>
            <div className={cn(style['checkbox-box'])}>
                <div className={cn(style['checkbox-box-background'])} />
                <div className={cn(style['checkbox-box-border'])} />
                <svg
                    className={cn(style.tick)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 49.96 37.33"
                >
                    <polyline points="4 17.49 18.11 33.33 45.96 4" />
                </svg>
            </div>
            <div className={cn(style.text)}>{children}</div>
        </div>
    );
}
