const roots = document.querySelectorAll<HTMLElement>('[data-built-to-do]')

const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableDescendants(container: HTMLElement) {
    return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((element) => {
        return (
            !element.hasAttribute('disabled') &&
            element.getAttribute('aria-hidden') !== 'true'
        )
    })
}

roots.forEach((root) => {
    const triggers = Array.from(
        root.querySelectorAll<HTMLButtonElement>('[data-built-to-do-trigger]')
    )
    const panels = Array.from(
        root.querySelectorAll<HTMLElement>('[data-built-to-do-panel]')
    )
    const triggerList =
        triggers[0]?.closest<HTMLElement>('[role="tablist"]') ?? null
    const panelsContainer = panels[0]?.parentElement ?? null
    const desktopQuery = window.matchMedia('(min-width: 80rem)')

    let activePanelId: string | undefined

    const getTriggerById = (panelId: string | undefined) => {
        return triggers.find((trigger) => {
            return trigger.dataset.builtToDoTrigger === panelId
        })
    }

    const movePanelsToDesktopContainer = () => {
        if (panelsContainer == null) {
            return
        }

        panels.forEach((panel) => {
            panelsContainer.append(panel)
        })
    }

    const applyDesktopSemantics = () => {
        triggerList?.setAttribute('role', 'tablist')
        triggerList?.setAttribute('aria-orientation', 'vertical')

        triggers.forEach((trigger) => {
            trigger.setAttribute('role', 'tab')
            trigger.removeAttribute('aria-expanded')
        })

        panels.forEach((panel) => {
            panel.setAttribute('role', 'tabpanel')
        })
    }

    const applyMobileSemantics = () => {
        triggerList?.removeAttribute('role')
        triggerList?.removeAttribute('aria-orientation')

        triggers.forEach((trigger) => {
            trigger.removeAttribute('role')
            trigger.removeAttribute('aria-selected')
            trigger.tabIndex = 0
        })

        panels.forEach((panel) => {
            panel.removeAttribute('role')
        })
    }

    const activatePanel = (panelId: string | undefined) => {
        if (panelId == null) {
            return
        }

        activePanelId = panelId

        const isDesktop = desktopQuery.matches

        if (isDesktop) {
            movePanelsToDesktopContainer()
            applyDesktopSemantics()
        } else {
            applyMobileSemantics()
        }

        triggers.forEach((trigger) => {
            const isActive = trigger.dataset.builtToDoTrigger === panelId

            if (isDesktop) {
                trigger.setAttribute('aria-selected', String(isActive))
                trigger.tabIndex = isActive ? 0 : -1
                return
            }

            trigger.setAttribute('aria-expanded', String(isActive))
            trigger.tabIndex = 0
        })

        panels.forEach((panel) => {
            const isActive = panel.dataset.builtToDoPanel === panelId
            panel.hidden = !isActive
            panel.tabIndex = isActive ? 0 : -1

            if (isDesktop || isActive) {
                return
            }

            panelsContainer?.append(panel)
        })

        if (isDesktop) {
            return
        }

        const activeTrigger = getTriggerById(panelId)
        const activePanel = getPanelById(panelId)

        if (activeTrigger == null || activePanel == null) {
            return
        }

        activeTrigger.insertAdjacentElement('afterend', activePanel)
    }

    const getTriggerIndex = (panelId: string | undefined) => {
        return triggers.findIndex(
            (trigger) => trigger.dataset.builtToDoTrigger === panelId
        )
    }

    const getPanelById = (panelId: string | undefined) => {
        return panels.find((panel) => panel.dataset.builtToDoPanel === panelId)
    }

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            activatePanel(trigger.dataset.builtToDoTrigger)
        })

        trigger.addEventListener('focus', () => {
            if (!desktopQuery.matches) {
                return
            }

            activatePanel(trigger.dataset.builtToDoTrigger)
        })

        trigger.addEventListener('keydown', (event: KeyboardEvent) => {
            if (!desktopQuery.matches) {
                return
            }

            const key = event.key

            if (key === 'Tab' && event.shiftKey) {
                const previousTrigger = triggers[index - 1]

                if (previousTrigger == null) {
                    return
                }

                const previousPanel = getPanelById(
                    previousTrigger.dataset.builtToDoTrigger
                )

                if (previousPanel == null) {
                    return
                }

                const focusableDescendants =
                    getFocusableDescendants(previousPanel)
                const previousFocusTarget =
                    focusableDescendants[focusableDescendants.length - 1] ??
                    previousPanel

                event.preventDefault()
                activatePanel(previousTrigger.dataset.builtToDoTrigger)
                previousFocusTarget.focus()
                return
            }

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

    panels.forEach((panel) => {
        panel.addEventListener('keydown', (event: KeyboardEvent) => {
            if (!desktopQuery.matches) {
                return
            }

            if (event.key !== 'Tab' || event.shiftKey || panel.hidden) {
                return
            }

            const focusTarget =
                event.target instanceof HTMLElement ? event.target : null
            const focusableDescendants = getFocusableDescendants(panel)
            const lastFocusable =
                focusableDescendants[focusableDescendants.length - 1]

            if (lastFocusable == null) {
                if (focusTarget !== panel) {
                    return
                }
            } else if (focusTarget !== lastFocusable) {
                return
            }

            const currentTriggerIndex = getTriggerIndex(
                panel.dataset.builtToDoPanel
            )
            const nextTrigger = triggers[currentTriggerIndex + 1]

            if (nextTrigger == null) {
                return
            }

            event.preventDefault()
            nextTrigger.focus()
        })
    })

    const initialTrigger =
        triggers.find(
            (trigger) => trigger.getAttribute('aria-selected') === 'true'
        ) ?? triggers[0]

    const initialPanelId = initialTrigger?.dataset.builtToDoTrigger
    activePanelId = initialPanelId
    activatePanel(initialPanelId)

    desktopQuery.addEventListener('change', () => {
        activatePanel(activePanelId)
    })
})

export {}
