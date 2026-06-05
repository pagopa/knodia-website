type GdprAccessStepId =
    | 'controlled-access'
    | 'enforced-requirements'
    | 'full-traceability'

type FederationRoleId = 'knodia' | 'knodes' | 'organizations'

type SecurityStepId =
    | 'cryptographic-material'
    | 'bearer-dpop'
    | 'signed-responses'

export type CardData = {
    id: GdprAccessStepId | FederationRoleId | SecurityStepId
    label: string
    description: string
    image: ImageMetadata
}
