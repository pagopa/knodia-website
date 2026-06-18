type UseCaseCard = {
    title: string
    description?: string
    href: string
    tags: string[]
}

const useCases: UseCaseCard[] = [
    {
        title: 'Standardised communication',
        href: '/use-cases/standardised-communication-across-domains',
        tags: ['MANY-TO-MANY', 'SHARED PROTOCOL'],
    },
    {
        title: 'A distributed base register',
        description:
            'How a shared model can support a register distributed across multiple organizations and Member States.',
        href: '/use-cases/managing-a-distributed-base-register',
        tags: ['SOURCE DATA'],
    },
    {
        title: 'Handling delayed responses',
        description:
            'How organizations can manage requests when a response cannot be produced in real time.',
        href: '/use-cases/handling-requests-with-delayed-responses',
        tags: ['ASYNCHRONOUS EXCHANGE'],
    },
    {
        title: 'Keeping local data aligned with a base register',
        description:
            'How organizations can stay aligned with changes in data retrieved from an authoritative source.',
        href: '/use-cases/data-synchronisation-with-a-base-register',
        tags: ['DATA SYNCHRONIZATION'],
    },
]

function getRandomUseCases(): UseCaseCard[] {
    const values = new Set()
    const randomUseCases: UseCaseCard[] = []
    const max = 4
    while (values.size < 3) {
        const rand = Math.floor(Math.random() * max)
        if (!values.has(rand)) {
            randomUseCases.push(useCases[rand])
        }
        values.add(rand)
    }

    return randomUseCases
}

export { useCases, getRandomUseCases }
