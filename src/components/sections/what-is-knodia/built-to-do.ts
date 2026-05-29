const roots = document.querySelectorAll<HTMLElement>('[data-built-to-do]')

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[data-built-to-do-trigger]')
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-built-to-do-panel]')
    )

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        triggers.forEach((trigger) => {
            const isExpanded = trigger.dataset.builtToDoTrigger === panelId
            trigger.setAttribute('aria-expanded', String(isExpanded))
        })

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.builtToDoPanel !== panelId
        })
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.builtToDoTrigger)
        })

        trigger.addEventListener('focus', () => {
            activatePanel(trigger.dataset.builtToDoTrigger)
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
            activatePanel(nextTrigger?.dataset.builtToDoTrigger)
            nextTrigger?.focus()
        })
    })
})

export {}
