import type { ReactNode } from 'react'
import {
    Link as AriaLink,
    type LinkProps as AriaLinkProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import {
    ArrowRightIcon,
    SourceIcon,
    type IconComponent as ButtonIcon,
} from './Icon'

export type {
    IconComponent as ButtonIcon,
    IconComponentProps as ButtonIconProps,
} from './Icon'

export type ButtonVariant = 'contained' | 'outlined' | 'naked' | 'feature'
export type ButtonTone = 'default' | 'contrast'
export type ButtonSize = 'small' | 'medium'
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled'

type SharedProps = {
    children: ReactNode
    variant?: ButtonVariant
    tone?: ButtonTone
    size?: ButtonSize
    state?: ButtonState
    icon?: ButtonIcon
    iconPosition?: 'left' | 'right'
    badgeIcon?: ButtonIcon
    className?: string
    disabled?: boolean
}

export type Props = SharedProps &
    Omit<AriaLinkProps, 'children' | 'className' | 'isDisabled' | 'href'> & {
        href: string
    }

const buttonRoot = tv({
    base: 'group inline-flex w-fit max-w-full select-none items-center justify-center align-middle whitespace-nowrap transition-colors duration-150 ease-out outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variants: {
        variant: {
            contained:
                'h-[var(--button-height)] rounded-[var(--radius-button)] px-[var(--button-padding-x)]',
            outlined:
                'h-[var(--button-height)] rounded-[var(--radius-button)] border-[length:var(--border-button)] border-solid px-[calc(var(--button-padding-x)-var(--border-button))]',
            naked: 'bg-transparent p-0',
            feature: 'bg-transparent p-0 text-left',
        },
        tone: {
            default: '',
            contrast: '',
        },
        visualState: {
            default: 'cursor-pointer',
            hover: 'cursor-pointer',
            active: 'cursor-pointer',
            disabled: 'cursor-not-allowed pointer-events-none',
        },
    },
    compoundVariants: [
        {
            variant: 'contained',
            tone: 'default',
            visualState: 'default',
            class: 'bg-[var(--color-primary-violet)] text-[var(--color-neutral-white)] hover:bg-[var(--color-primary-violet-hover)] active:bg-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'contained',
            tone: 'default',
            visualState: 'hover',
            class: 'bg-[var(--color-primary-violet-hover)] text-[var(--color-neutral-white)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'contained',
            tone: 'default',
            visualState: 'active',
            class: 'bg-[var(--color-deep-violet)] text-[var(--color-neutral-white)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'contained',
            tone: 'default',
            visualState: 'disabled',
            class: 'bg-[var(--color-neutral-gray-40)] text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'contained',
            tone: 'contrast',
            visualState: 'default',
            class: 'bg-[var(--color-neutral-white)] text-[var(--color-primary-violet)] hover:bg-[var(--color-secondary-soft-quartz)] active:bg-[var(--color-secondary-muted-amber)] active:text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'contained',
            tone: 'contrast',
            visualState: 'hover',
            class: 'bg-[var(--color-secondary-soft-quartz)] text-[var(--color-primary-violet)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'contained',
            tone: 'contrast',
            visualState: 'active',
            class: 'bg-[var(--color-secondary-muted-amber)] text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'contained',
            tone: 'contrast',
            visualState: 'disabled',
            class: 'bg-[var(--color-neutral-gray-40)] text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'outlined',
            tone: 'default',
            visualState: 'default',
            class: 'border-[var(--color-primary-violet)] text-[var(--color-primary-violet)] hover:border-[var(--color-primary-violet-hover)] hover:text-[var(--color-primary-violet-hover)] active:border-[var(--color-deep-violet)] active:text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'outlined',
            tone: 'default',
            visualState: 'hover',
            class: 'border-[var(--color-primary-violet-hover)] text-[var(--color-primary-violet-hover)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'outlined',
            tone: 'default',
            visualState: 'active',
            class: 'border-[var(--color-deep-violet)] text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'outlined',
            tone: 'default',
            visualState: 'disabled',
            class: 'border-[var(--color-neutral-medium-gray)] text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'outlined',
            tone: 'contrast',
            visualState: 'default',
            class: 'border-[var(--color-neutral-white)] text-[var(--color-neutral-white)] hover:border-[var(--color-secondary-soft-quartz)] hover:text-[var(--color-secondary-soft-quartz)] active:border-[var(--color-secondary-muted-amber)] active:text-[var(--color-secondary-muted-amber)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'outlined',
            tone: 'contrast',
            visualState: 'hover',
            class: 'border-[var(--color-secondary-soft-quartz)] text-[var(--color-secondary-soft-quartz)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'outlined',
            tone: 'contrast',
            visualState: 'active',
            class: 'border-[var(--color-secondary-muted-amber)] text-[var(--color-secondary-muted-amber)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'outlined',
            tone: 'contrast',
            visualState: 'disabled',
            class: 'border-[var(--color-neutral-medium-gray)] text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'naked',
            tone: 'default',
            visualState: 'default',
            class: 'text-[var(--color-neutral-graphite)] hover:text-[var(--color-primary-violet-muted)] active:text-[var(--color-primary-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'naked',
            tone: 'default',
            visualState: 'hover',
            class: 'text-[var(--color-primary-violet-muted)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'naked',
            tone: 'default',
            visualState: 'active',
            class: 'text-[var(--color-primary-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'naked',
            tone: 'default',
            visualState: 'disabled',
            class: 'text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'naked',
            tone: 'contrast',
            visualState: 'default',
            class: 'text-[var(--color-neutral-white)] hover:text-[var(--color-secondary-soft-quartz)] active:text-[var(--color-secondary-muted-amber)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'naked',
            tone: 'contrast',
            visualState: 'hover',
            class: 'text-[var(--color-secondary-soft-quartz)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'naked',
            tone: 'contrast',
            visualState: 'active',
            class: 'text-[var(--color-secondary-muted-amber)] focus-visible:outline-[var(--color-neutral-white)]',
        },
        {
            variant: 'naked',
            tone: 'contrast',
            visualState: 'disabled',
            class: 'text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
        {
            variant: 'feature',
            tone: 'default',
            visualState: 'default',
            class: 'text-[var(--color-primary-violet)] hover:text-[var(--color-deep-violet)] active:text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'feature',
            tone: 'default',
            visualState: 'hover',
            class: 'text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'feature',
            tone: 'default',
            visualState: 'active',
            class: 'text-[var(--color-deep-violet)] focus-visible:outline-[var(--color-primary-violet)]',
        },
        {
            variant: 'feature',
            tone: 'default',
            visualState: 'disabled',
            class: 'text-[var(--color-neutral-medium-gray)] focus-visible:outline-[var(--color-neutral-medium-gray)]',
        },
    ],
    defaultVariants: {
        tone: 'default',
        visualState: 'default',
    },
})

const buttonContent = tv({
    base: 'inline-flex items-center justify-center',
    variants: {
        variant: {
            contained: 'gap-[var(--button-gap)]',
            outlined: 'gap-[var(--button-gap)]',
            naked: 'gap-[var(--button-gap-sm)]',
            feature: 'gap-[var(--feature-gap)]',
        },
    },
})

const buttonLabel = tv({
    base: 'font-body tracking-[0]',
    variants: {
        variant: {
            contained:
                'text-[length:var(--text-button-md)] leading-[var(--leading-button-md)] font-medium',
            outlined:
                'text-[length:var(--text-button-md)] leading-[var(--leading-button-md)] font-medium',
            naked: '',
            feature:
                'text-[length:var(--text-button-md)] leading-[var(--leading-button-md)] font-medium',
        },
        size: {
            small: '',
            medium: '',
        },
    },
    compoundVariants: [
        {
            variant: 'naked',
            size: 'small',
            class: 'text-[length:var(--text-button-sm)] leading-[var(--leading-button-sm)] font-medium',
        },
        {
            variant: 'naked',
            size: 'medium',
            class: 'text-[length:var(--text-button-md)] leading-[var(--leading-button-md)] font-normal',
        },
    ],
})

const buttonIcon = tv({
    base: 'shrink-0',
    variants: {
        variant: {
            contained: 'size-[var(--button-icon-size)]',
            outlined: 'size-[var(--button-icon-size)]',
            naked: '',
            feature: 'size-[var(--button-icon-size)]',
        },
        size: {
            small: '',
            medium: '',
        },
    },
    compoundVariants: [
        {
            variant: 'naked',
            size: 'small',
            class: 'size-[var(--button-icon-size-sm)]',
        },
        {
            variant: 'naked',
            size: 'medium',
            class: 'size-[var(--button-icon-size-sm)]',
        },
    ],
})

const featureBadge =
    'flex size-[var(--feature-badge-size)] shrink-0 items-center justify-center rounded-[var(--radius-feature)] bg-[var(--color-secondary-soft-quartz)]'

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(' ')
}

function renderIcon(Icon?: ButtonIcon) {
    if (Icon == null) {
        return null
    }

    return <Icon aria-hidden={true} className="size-full" />
}

export default function Button(props: Props) {
    const {
        badgeIcon,
        children,
        className,
        disabled = false,
        href,
        icon,
        iconPosition = 'right',
        rel,
        size,
        state = 'default',
        target,
        tone = 'default',
        variant = 'contained',
        ...rest
    } = props

    const resolvedTone = variant === 'feature' ? 'default' : tone
    const resolvedSize = size ?? (variant === 'naked' ? 'small' : 'medium')
    const resolvedIcon =
        icon ?? (variant === 'feature' ? ArrowRightIcon : undefined)
    const resolvedBadgeIcon =
        variant === 'feature' ? (badgeIcon ?? SourceIcon) : undefined
    const isDisabled = disabled || state === 'disabled'
    const visualState: ButtonState = isDisabled ? 'disabled' : state
    const showLeadingIcon = resolvedIcon != null && iconPosition === 'left'
    const showTrailingIcon = resolvedIcon != null && iconPosition === 'right'
    const rootClassName = joinClasses(
        buttonRoot({
            tone: resolvedTone,
            variant,
            visualState,
        }),
        className
    )

    const content = (
        <span className={buttonContent({ variant })}>
            {variant === 'feature' && resolvedBadgeIcon != null ? (
                <span aria-hidden="true" className={featureBadge}>
                    <span
                        className={buttonIcon({
                            size: 'medium',
                            variant: 'feature',
                        })}
                    >
                        {renderIcon(resolvedBadgeIcon)}
                    </span>
                </span>
            ) : null}
            {showLeadingIcon ? (
                <span
                    aria-hidden="true"
                    className={buttonIcon({
                        size: resolvedSize,
                        variant,
                    })}
                >
                    {renderIcon(resolvedIcon)}
                </span>
            ) : null}
            <span
                className={buttonLabel({
                    size: resolvedSize,
                    variant,
                })}
            >
                {children}
            </span>
            {showTrailingIcon ? (
                <span
                    aria-hidden="true"
                    className={buttonIcon({
                        size: resolvedSize,
                        variant,
                    })}
                >
                    {renderIcon(resolvedIcon)}
                </span>
            ) : null}
        </span>
    )

    return (
        <AriaLink
            {...rest}
            className={rootClassName}
            href={href}
            isDisabled={isDisabled}
            rel={target === '_blank' && rel == null ? 'noreferrer' : rel}
            target={target}
        >
            {content}
        </AriaLink>
    )
}
