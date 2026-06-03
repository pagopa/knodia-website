export type HeaderMenuItem = {
    id: string
    label: string
    href: string
    title: string
    bestFor: string
    topics: string[]
}

export type HeaderMenuGroup = {
    id: 'overview' | 'product'
    label: string
    items: HeaderMenuItem[]
}

export type HeaderPrimaryLink = {
    id: string
    label: string
    href: string
}

export const headerMenuGroups = [
    {
        id: 'overview',
        label: 'Overview',
        items: [
            {
                id: 'whats-knodia',
                label: 'What’s Knodia',
                href: '/what-is-knodia',
                title: 'Framework, origins and audience',
                bestFor: 'Decision makers',
                topics: [
                    'Built on proven expertise',
                    'Who Knodia is for',
                    'What Knodia is built to do',
                    'Knodia principles',
                ],
            },
            {
                id: 'why-knodia',
                label: 'Why Knodia',
                href: '/why-knodia',
                title: 'Benefits and practical value',
                bestFor: 'Decision makers',
                topics: [
                    'Our architecture at a glance',
                    'Benefits for you',
                    'Comparing approaches',
                    'What Knodia handles',
                ],
            },
            {
                id: 'core-functions',
                label: 'Core Functions',
                href: '/core-functions',
                title: 'The five functions behind the model',
                bestFor: 'Decision makers, tech teams',
                topics: [
                    'Knodes core functions',
                    'How the core functions work together',
                    'Knodes addictional functions',
                ],
            },
        ],
    },
    {
        id: 'product',
        label: 'Product',
        items: [
            {
                id: 'technology',
                label: 'Technology',
                href: '/#product-technology',
                title: 'Architecture and technical foundations',
                bestFor: 'Tech teams',
                topics: [
                    'Knodia federated model',
                    'Technical foundations',
                    'Different security requirements',
                ],
            },
            {
                id: 'security',
                label: 'Security',
                href: '/#product-security',
                title: 'Trust, access and security mechanisms',
                bestFor: 'Tech teams + privacy and legal teams',
                topics: [
                    'Security principles',
                    'Privacy-first architecture',
                    'How Knodia security works',
                    'Trust + token-based access',
                    'Levels of security',
                    'Open standards',
                ],
            },
            {
                id: 'compliance',
                label: 'Compliance',
                href: '/#product-compliance',
                title: 'European requirements and data protection',
                bestFor: 'Privacy and legals teams',
                topics: [
                    'How Knodia addresses the 4 interop layers',
                    'Designed for GDPR-aligned access',
                    'Built on European references',
                ],
            },
            {
                id: 'governance',
                label: 'Governance',
                href: '/#product-governance',
                title: 'Shared rules and distributed responsibilities',
                bestFor: 'Privacy and legals teams',
                topics: [
                    'Shared governance',
                    'How governance works',
                    'Shared semantics',
                ],
            },
        ],
    },
] as const satisfies readonly HeaderMenuGroup[]

export const headerPrimaryLinks = [
    {
        id: 'use-cases',
        label: 'Use cases',
        href: '/#use-cases',
    },
    {
        id: 'resources',
        label: 'Resources',
        href: '/#resources',
    },
] as const satisfies readonly HeaderPrimaryLink[]

export const headerCta = {
    href: '/what-is-knodia',
    label: 'Get started',
} as const
