const roots = document.querySelectorAll<HTMLElement>(
    '[data-technology-federation]'
)

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>(
            '[data-technology-federation-trigger]'
        )
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-technology-federation-panel]')
    )

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        triggers.forEach((trigger) => {
            const isSelected =
                trigger.dataset.technologyFederationTrigger === panelId
            trigger.setAttribute('aria-selected', String(isSelected))
            trigger.tabIndex = isSelected ? 0 : -1
        })

        panels.forEach((panel) => {
            const isActive = panel.dataset.technologyFederationPanel === panelId
            panel.hidden = !isActive
            panel.tabIndex = isActive ? 0 : -1
        })
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.technologyFederationTrigger)
        })

        trigger.addEventListener('focus', () => {
            activatePanel(trigger.dataset.technologyFederationTrigger)
        })

        trigger.addEventListener('keydown', (event: KeyboardEvent) => {
            const key = event.key

            if (
                key !== 'ArrowRight' &&
                key !== 'ArrowLeft' &&
                key !== 'ArrowDown' &&
                key !== 'ArrowUp' &&
                key !== 'Home' &&
                key !== 'End'
            ) {
                return
            }

            event.preventDefault()

            let nextIndex = index

            if (key === 'ArrowRight' || key === 'ArrowDown') {
                nextIndex = (index + 1) % triggers.length
            } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
                nextIndex = (index - 1 + triggers.length) % triggers.length
            } else if (key === 'Home') {
                nextIndex = 0
            } else if (key === 'End') {
                nextIndex = triggers.length - 1
            }

            const nextTrigger = triggers[nextIndex]
            activatePanel(nextTrigger?.dataset.technologyFederationTrigger)
            nextTrigger?.focus()
        })
    })

    const initialTrigger =
        triggers.find(
            (trigger) => trigger.getAttribute('aria-selected') === 'true'
        ) ?? triggers[0]

    activatePanel(initialTrigger?.dataset.technologyFederationTrigger)
})

export {}
