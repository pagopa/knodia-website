const roots = document.querySelectorAll<HTMLElement>('[data-home-guidance]')

roots.forEach((root) => {
    const tabs = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[role="tabpanel"]')
    )

    const activateTab = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        tabs.forEach((tab) => {
            const isActive = tab.dataset.guidanceTrigger === panelId
            tab.setAttribute('aria-selected', String(isActive))
            tab.tabIndex = isActive ? 0 : -1
        })

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.guidancePanel !== panelId
        })
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            activateTab(tab.dataset.guidanceTrigger)
        })

        tab.addEventListener('keydown', (event: KeyboardEvent) => {
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
                nextIndex = (index + 1) % tabs.length
            } else if (key === 'ArrowLeft') {
                nextIndex = (index - 1 + tabs.length) % tabs.length
            } else if (key === 'Home') {
                nextIndex = 0
            } else if (key === 'End') {
                nextIndex = tabs.length - 1
            }

            const nextTab = tabs[nextIndex]
            activateTab(nextTab?.dataset.guidanceTrigger)
            nextTab?.focus()
        })
    })
})
