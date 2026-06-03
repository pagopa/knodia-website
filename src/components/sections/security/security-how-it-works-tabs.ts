const roots = document.querySelectorAll<HTMLElement>(
    '[data-security-how-it-works]'
)

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>(
            '[data-security-how-it-works-trigger]'
        )
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-security-how-it-works-panel]')
    )

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        triggers.forEach((trigger) => {
            const isSelected =
                trigger.dataset.securityHowItWorksTrigger === panelId
            trigger.setAttribute('aria-selected', String(isSelected))
            trigger.tabIndex = isSelected ? 0 : -1
        })

        panels.forEach((panel) => {
            const isActive = panel.dataset.securityHowItWorksPanel === panelId
            panel.hidden = !isActive
            panel.tabIndex = isActive ? 0 : -1
        })
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.securityHowItWorksTrigger)
        })

        trigger.addEventListener('focus', () => {
            activatePanel(trigger.dataset.securityHowItWorksTrigger)
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
            activatePanel(nextTrigger?.dataset.securityHowItWorksTrigger)
            nextTrigger?.focus()
        })
    })

    const initialTrigger =
        triggers.find(
            (trigger) => trigger.getAttribute('aria-selected') === 'true'
        ) ?? triggers[0]

    activatePanel(initialTrigger?.dataset.securityHowItWorksTrigger)
})

export {}
