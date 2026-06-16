type UseCaseCard = {
    title: string
    description?: string
    href: string
    tags: string[]
}

const viewAllHref = '/#use-cases'

const useCases: UseCaseCard[] = [
    {
        title: 'A distributed base register',
        description:
            'How a shared model can support a register distributed across multiple organizations and Member States.',
        href: viewAllHref,
        tags: ['SOURCE DATA'],
    },
    {
        title: 'Handling delayed responses',
        description:
            'How organizations can manage requests when a response cannot be produced in real time.',
        href: viewAllHref,
        tags: ['ASYNCHRONOUS EXCHANGE'],
    },
    {
        title: 'Standardised communication',
        href: viewAllHref,
        tags: ['MANY-TO-MANY', 'SHARED PROTOCOL'],
    },
]

function getRandomUseCases(): UseCaseCard[] {
    const values = new Set()
    const randomUseCases: UseCaseCard[] = []
    const max = 3
    while (values.size < 3) {
        const rand = Math.floor(Math.random() * max)
        if (!values.has(rand)) {
            randomUseCases.push(useCases[rand])
        }
        values.add(rand)
    }
    console.log(randomUseCases)

    return randomUseCases
}

export { useCases, getRandomUseCases }
