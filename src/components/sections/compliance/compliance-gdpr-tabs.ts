const roots = document.querySelectorAll<HTMLElement>('[data-compliance-gdpr]')

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>(
            '[data-compliance-gdpr-trigger]'
        )
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-compliance-gdpr-panel]')
    )

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        triggers.forEach((trigger) => {
            const isSelected = trigger.dataset.complianceGdprTrigger === panelId
            trigger.setAttribute('aria-selected', String(isSelected))
            trigger.setAttribute('aria-expanded', String(isSelected))
            trigger.tabIndex = isSelected ? 0 : -1
        })

        panels.forEach((panel) => {
            const isActive = panel.dataset.complianceGdprPanel === panelId
            panel.hidden = !isActive
            panel.tabIndex = isActive ? 0 : -1
        })
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.complianceGdprTrigger)
        })

        trigger.addEventListener('focus', () => {
            activatePanel(trigger.dataset.complianceGdprTrigger)
        })

        trigger.addEventListener('keydown', (event: KeyboardEvent) => {
            const key = event.key

            if (
                key !== 'ArrowDown' &&
                key !== 'ArrowUp' &&
                key !== 'ArrowRight' &&
                key !== 'ArrowLeft' &&
                key !== 'Home' &&
                key !== 'End'
            ) {
                return
            }

            event.preventDefault()

            let nextIndex = index

            if (key === 'ArrowDown' || key === 'ArrowRight') {
                nextIndex = (index + 1) % triggers.length
            } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
                nextIndex = (index - 1 + triggers.length) % triggers.length
            } else if (key === 'Home') {
                nextIndex = 0
            } else if (key === 'End') {
                nextIndex = triggers.length - 1
            }

            const nextTrigger = triggers[nextIndex]
            activatePanel(nextTrigger?.dataset.complianceGdprTrigger)
            nextTrigger?.focus()
        })
    })

    const initialTrigger =
        triggers.find(
            (trigger) => trigger.getAttribute('aria-selected') === 'true'
        ) ?? triggers[0]

    activatePanel(initialTrigger?.dataset.complianceGdprTrigger)
})

export {}
