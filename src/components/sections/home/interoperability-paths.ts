const roots = document.querySelectorAll<HTMLElement>('[data-home-guidance]')

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[data-guidance-trigger]')
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-guidance-panel]')
    )

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        triggers.forEach((trigger) => {
            const isExpanded = trigger.dataset.guidanceTrigger === panelId
            trigger.setAttribute('aria-expanded', String(isExpanded))
        })

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.guidancePanel !== panelId
        })
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.guidanceTrigger)
        })

        trigger.addEventListener('focus', () => {
            activatePanel(trigger.dataset.guidanceTrigger)
        })

        trigger.addEventListener('keydown', (event: KeyboardEvent) => {
            const key = event.key

            if (
                key !== 'ArrowRight' &&
                key !== 'ArrowLeft' &&
                key !== 'Home' &&
                key !== 'End'
            ) {
                return
            }

            event.preventDefault()

            let nextIndex = index

            if (key === 'ArrowRight') {
                nextIndex = (index + 1) % triggers.length
            } else if (key === 'ArrowLeft') {
                nextIndex = (index - 1 + triggers.length) % triggers.length
            } else if (key === 'Home') {
                nextIndex = 0
            } else if (key === 'End') {
                nextIndex = triggers.length - 1
            }

            const nextTrigger = triggers[nextIndex]
            activatePanel(nextTrigger?.dataset.guidanceTrigger)
            nextTrigger?.focus()
        })
    })
})

export {}
