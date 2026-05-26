import type { ComponentType } from 'react'
import { tv } from 'tailwind-variants'

export const iconNames = [
    'attach_file',
    'block',
    'bookmark',
    'inventory_2',
    'credit_card',
    'open_in_new',
    'folder',
    'key',
    'account_balance',
    'add',
    'settings',
    'person',
    'logout',
    'keyboard_arrow_right',
    'arrow_downward',
    'event',
    'add_a_photo',
    'check_circle',
    'alarm',
    'chart_data',
    'check',
    'filter_alt',
    'link',
    'edit',
    'adf_scanner',
    'share',
    'account_circle',
    'more_vert',
    'keyboard_arrow_left',
    'arrow_upward',
    'cancel',
    'code_blocks',
    'chat',
    'mail',
    'mark_email_unread',
    'article',
    'inbox_text',
    'visibility',
    'keep',
    'help',
    'kid_star',
    'lock',
    'menu',
    'keyboard_arrow_down',
    'arrow_back',
    'content_copy',
    'flag',
    'download',
    'upload',
    'dangerous',
    'info',
    'visibility_off',
    'delete',
    'backspace',
    'search',
    'lock_open_right',
    'close',
    'keyboard_arrow_up',
    'arrow_forward',
] as const

export type IconName = (typeof iconNames)[number]
export type IconSize = 'button' | 'button-small' | 'showcase'
export type IconComponentProps = {
    className?: string
    'aria-hidden'?: boolean
    title?: string
}
export type IconComponent = ComponentType<IconComponentProps>

type Props = IconComponentProps & {
    name: IconName
    size?: IconSize
}

export const iconShowcaseColumns = [
    [
        'attach_file',
        'block',
        'bookmark',
        'inventory_2',
        'credit_card',
        'open_in_new',
        'folder',
        'key',
        'account_balance',
        'add',
        'settings',
        'person',
        'logout',
        'keyboard_arrow_right',
        'arrow_downward',
    ],
    [
        'event',
        'add_a_photo',
        'check_circle',
        'alarm',
        'chart_data',
        'check',
        'filter_alt',
        'link',
        'edit',
        'adf_scanner',
        'share',
        'account_circle',
        'more_vert',
        'keyboard_arrow_left',
        'arrow_upward',
    ],
    [
        'cancel',
        'code_blocks',
        'chat',
        'mail',
        'mark_email_unread',
        'article',
        'inbox_text',
        'visibility',
        'keep',
        'help',
        'kid_star',
        'lock',
        'menu',
        'keyboard_arrow_down',
        'arrow_back',
    ],
    [
        'content_copy',
        'code_blocks',
        'flag',
        'download',
        'upload',
        'dangerous',
        'info',
        'visibility_off',
        'delete',
        'backspace',
        'search',
        'lock_open_right',
        'close',
        'keyboard_arrow_up',
        'arrow_forward',
    ],
] as const satisfies readonly (readonly IconName[])[]

const iconRoot = tv({
    base: 'knodia-material-symbol inline-flex shrink-0 items-center justify-center leading-none text-current',
    variants: {
        size: {
            button: 'text-[length:var(--button-icon-size)]',
            'button-small': 'text-[length:var(--button-icon-size-sm)]',
            showcase: 'text-[length:var(--icon-showcase-icon-size)]',
        },
    },
    defaultVariants: {
        size: 'button',
    },
})

function joinClasses(...classes: Array<string | undefined>) {
    return classes.filter(Boolean).join(' ')
}

function toPascalCase(value: string) {
    return value
        .split('_')
        .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
        .join('')
}

export default function Icon(props: Props) {
    const {
        'aria-hidden': ariaHidden = true,
        className,
        name,
        size = 'button',
        title,
    } = props

    return (
        <span
            aria-hidden={title ? undefined : ariaHidden}
            aria-label={title}
            className={joinClasses(iconRoot({ size }), className)}
            role={title ? 'img' : undefined}
            title={title}
        >
            {name}
        </span>
    )
}

export function createIcon(
    name: IconName,
    defaultSize: IconSize = 'button'
): IconComponent {
    function MaterialIcon({ className, title, ...props }: IconComponentProps) {
        return (
            <Icon
                {...props}
                className={className}
                name={name}
                size={defaultSize}
                title={title}
            />
        )
    }

    MaterialIcon.displayName = `${toPascalCase(name)}Icon`

    return MaterialIcon
}

export const ArrowRightIcon = createIcon('arrow_forward')
export const ChevronDownIcon = createIcon('keyboard_arrow_down', 'button-small')

export function SourceIcon(props: IconComponentProps) {
    const { 'aria-hidden': ariaHidden = true, className, title } = props

    return (
        <svg
            aria-hidden={title ? undefined : ariaHidden}
            aria-label={title}
            className={joinClasses('size-full', className)}
            fill="none"
            role={title ? 'img' : undefined}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M6 6.75C6 5.78 6.78 5 7.75 5H13.63L18 9.37V17.25C18 18.22 17.22 19 16.25 19H7.75C6.78 19 6 18.22 6 17.25V6.75Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
            <path
                d="M13 5V10H18"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
            <path
                d="M9 12H15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
            />
            <path
                d="M9 15H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
            />
        </svg>
    )
}
