export type HeaderMenuItem = {
    id: string
    label: string
    href: string
    title: string
    bestFor: string
    topics: HeaderMenuTopic[]
}

export type HeaderMenuTopic = {
    label: string
    href: string
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
                label: 'What is Knodia',
                href: '/what-is-knodia',
                title: 'Framework, origins and audience',
                bestFor: 'Decision makers',
                topics: [
                    {
                        label: 'Knodia at a glance',
                        href: '/what-is-knodia#what-is-knodia-glance-title',
                    },
                    {
                        label: 'The challenges Knodia tackles',
                        href: '/what-is-knodia#what-is-knodia-challenges-title',
                    },
                    {
                        label: 'What Knodia is built to do',
                        href: '/what-is-knodia#what-is-knodia-built-to-do-title',
                    },
                    {
                        label: 'Who Knodia is for',
                        href: '/what-is-knodia#what-is-knodia-audience-title',
                    },
                ],
            },
            {
                id: 'why-knodia',
                label: 'Why Knodia',
                href: '/why-knodia',
                title: 'Benefits and practical value',
                bestFor: 'Decision makers',
                topics: [
                    {
                        label: 'Our architecture at a glance',
                        href: '/why-knodia#why-knodia-federated-network-title',
                    },
                    {
                        label: 'Benefits for you',
                        href: '/why-knodia#why-knodia-model-benefits-title',
                    },
                    {
                        label: 'Comparing approaches',
                        href: '/why-knodia#why-knodia-shared-model-title',
                    },
                    {
                        label: 'What Knodia handles',
                        href: '/why-knodia#why-knodia-practical-adoption-title',
                    },
                ],
            },
            {
                id: 'core-functions',
                label: 'Core Functions',
                href: '/core-functions',
                title: 'The five functions behind the model',
                bestFor: 'Decision makers, tech teams',
                topics: [
                    {
                        label: 'Knodes core functions',
                        href: '/core-functions#core-functions-overview-title',
                    },
                    {
                        label: 'Knodes addictional functions',
                        href: '/core-functions#core-functions-additional-functions-title',
                    },
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
                href: '/technology',
                title: 'Architecture and technical foundations',
                bestFor: 'Tech teams',
                topics: [
                    {
                        label: 'Knodia federated model',
                        href: '/technology#technology-federation-title',
                    },
                    {
                        label: 'Technical foundations',
                        href: '/technology#technology-foundations-title',
                    },
                    {
                        label: 'Different security requirements',
                        href: '/technology#technology-security-profiles-title',
                    },
                ],
            },
            {
                id: 'security',
                label: 'Security',
                href: '/security',
                title: 'Trust, access and security mechanisms',
                bestFor: 'Tech teams, privacy and legal teams',
                topics: [
                    {
                        label: 'Security principles',
                        href: '/security#security-principles-title',
                    },
                    {
                        label: 'Privacy-first architecture',
                        href: '/security#security-design-title',
                    },
                    {
                        label: 'How Knodia security works',
                        href: '/security#security-how-it-works-title',
                    },
                    {
                        label: 'Trust + token-based access',
                        href: '/security#security-trusted-access-title',
                    },
                    {
                        label: 'Levels of security',
                        href: '/security#security-framework-levels-title',
                    },
                    {
                        label: 'Open standards',
                        href: '/security#security-open-standards-title',
                    },
                ],
            },
            {
                id: 'compliance',
                label: 'Compliance',
                href: '/compliance',
                title: 'European requirements and data protection',
                bestFor: 'Privacy and legals teams',
                topics: [
                    {
                        label: 'How Knodia addresses the 4 interop layers',
                        href: '/compliance#compliance-layers-title',
                    },
                    {
                        label: 'Designed for GDPR-aligned access',
                        href: '/compliance#compliance-gdpr-title',
                    },
                    {
                        label: 'Built on European references',
                        href: '/compliance#compliance-european-regulation-title',
                    },
                ],
            },
            {
                id: 'governance',
                label: 'Governance',
                href: '/governance',
                title: 'Shared rules and distributed responsibilities',
                bestFor: 'Privacy and legals teams',
                topics: [
                    {
                        label: 'Shared governance',
                        href: '/governance#governance-shared-autonomy-title',
                    },
                    {
                        label: 'How governance works',
                        href: '/governance#governance-practice-title',
                    },
                    {
                        label: 'Shared semantics',
                        href: '/governance#governance-semantic-alignment-title',
                    },
                ],
            },
        ],
    },
] as const satisfies readonly HeaderMenuGroup[]

export const headerPrimaryLinks = [
    {
        id: 'use-cases',
        label: 'Use cases',
        href: '/use-cases',
    },
    {
        id: 'resources',
        label: 'Resources',
        href: '/resources',
    },
] as const satisfies readonly HeaderPrimaryLink[]

export const headerCta = {
    href: '/contacts',
    label: 'Get started',
} as const
