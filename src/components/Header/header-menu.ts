function toElements<T extends HTMLElement>(nodeList: NodeListOf<Element>): T[] {
    return Array.from(nodeList).filter(
        (node): node is T => node instanceof HTMLElement
    )
}

function initHeader(header: HTMLElement) {
    const triggers = toElements<HTMLElement>(
        header.querySelectorAll('[data-menu-trigger]')
    )
    const panels = toElements<HTMLElement>(
        header.querySelectorAll('[data-menu-panel]')
    )
    const mobileOpenButton =
        header.querySelector<HTMLElement>('[data-mobile-open]')
    const mobileOverlay = header.querySelector<HTMLElement>(
        '[data-mobile-overlay]'
    )
    const mobilePanels = toElements<HTMLElement>(
        header.querySelectorAll('[data-mobile-panel]')
    )
    const mobileGroupTriggers = toElements<HTMLElement>(
        header.querySelectorAll('[data-mobile-group-trigger]')
    )
    const mobileBackButtons = toElements<HTMLElement>(
        header.querySelectorAll('[data-mobile-back]')
    )
    const mobileCloseButtons = toElements<HTMLElement>(
        header.querySelectorAll('[data-mobile-close]')
    )
    const mobileLinks =
        mobileOverlay instanceof HTMLElement
            ? toElements<HTMLElement>(mobileOverlay.querySelectorAll('a'))
            : []

    let closeTimer: number | undefined
    let suppressedKeyboardClickMenuId: string | undefined
    let suppressedFocusOpenMenuId: string | undefined

    function getTrigger(menuId: string | undefined) {
        if (!menuId) {
            return undefined
        }

        return triggers.find(
            (trigger) => trigger.dataset.menuTrigger === menuId
        )
    }

    function getSubmenuTriggers(menuId: string | undefined) {
        if (!menuId) {
            return []
        }

        const panel = panels.find(
            (candidate) => candidate.dataset.menuPanel === menuId
        )

        if (!panel) {
            return []
        }

        return toElements<HTMLElement>(
            panel.querySelectorAll('[data-submenu-trigger]')
        )
    }

    function focusSubmenuTrigger(
        menuId: string | undefined,
        position: 'first' | 'last' = 'first'
    ) {
        const submenuTriggers = getSubmenuTriggers(menuId)

        if (submenuTriggers.length === 0) {
            return false
        }

        const selectedTrigger = submenuTriggers.find(
            (trigger) => trigger.dataset.selected === 'true'
        )
        const target =
            position === 'last'
                ? submenuTriggers[submenuTriggers.length - 1]
                : (selectedTrigger ?? submenuTriggers[0])

        target?.focus()

        return target instanceof HTMLElement
    }

    function clearCloseTimer() {
        if (closeTimer !== undefined) {
            window.clearTimeout(closeTimer)
            closeTimer = undefined
        }
    }

    function closeMenus() {
        clearCloseTimer()
        delete header.dataset.openMenu

        triggers.forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'false')
        })

        panels.forEach((panel) => {
            panel.hidden = true
        })
    }

    function setSelectedSubmenu(
        menuId: string | undefined,
        itemId: string | undefined
    ) {
        if (!menuId || !itemId) {
            return
        }

        const panel = panels.find(
            (candidate) => candidate.dataset.menuPanel === menuId
        )

        if (!panel) {
            return
        }

        toElements<HTMLElement>(
            panel.querySelectorAll('[data-submenu-trigger]')
        ).forEach((link) => {
            link.dataset.selected = String(
                link.dataset.submenuTrigger === itemId
            )
        })

        toElements<HTMLElement>(
            panel.querySelectorAll('[data-submenu-panel]')
        ).forEach((section) => {
            section.hidden = section.dataset.submenuPanel !== itemId
        })
    }

    function openMenu(menuId: string | undefined) {
        if (!menuId) {
            return
        }

        clearCloseTimer()
        header.dataset.openMenu = menuId

        triggers.forEach((trigger) => {
            const isOpen = trigger.dataset.menuTrigger === menuId
            trigger.setAttribute('aria-expanded', String(isOpen))
        })

        panels.forEach((panel) => {
            const isOpen = panel.dataset.menuPanel === menuId
            panel.hidden = !isOpen

            if (isOpen) {
                const selectedLink = panel.querySelector<HTMLElement>(
                    '[data-submenu-trigger][data-selected="true"]'
                )
                const fallbackItemId = panel.dataset.defaultItem
                const itemId =
                    selectedLink?.dataset.submenuTrigger ?? fallbackItemId

                if (itemId) {
                    setSelectedSubmenu(menuId, itemId)
                }
            }
        })
    }

    function scheduleClose() {
        clearCloseTimer()
        closeTimer = window.setTimeout(closeMenus, 120)
    }

    function setMobilePanel(panelId: string | undefined) {
        if (!panelId) {
            return
        }

        mobilePanels.forEach((panel) => {
            panel.hidden = panel.dataset.mobilePanel !== panelId
        })

        header.dataset.mobilePanel = panelId
    }

    function openMobileMenu() {
        if (!(mobileOverlay instanceof HTMLElement)) {
            return
        }

        mobileOverlay.hidden = false
        header.dataset.mobileOpen = 'true'
        header.dataset.mobilePanel = 'root'
        setMobilePanel('root')
        document.documentElement.style.overflow = 'hidden'

        if (mobileOpenButton instanceof HTMLElement) {
            mobileOpenButton.setAttribute('aria-expanded', 'true')
        }
    }

    function closeMobileMenu() {
        if (mobileOverlay instanceof HTMLElement) {
            mobileOverlay.hidden = true
        }

        delete header.dataset.mobileOpen
        delete header.dataset.mobilePanel
        document.documentElement.style.overflow = ''

        if (mobileOpenButton instanceof HTMLElement) {
            mobileOpenButton.setAttribute('aria-expanded', 'false')
        }

        setMobilePanel('root')
    }

    triggers.forEach((trigger) => {
        const menuId = trigger.dataset.menuTrigger

        trigger.addEventListener('pointerenter', () => {
            openMenu(menuId)
        })

        trigger.addEventListener('focus', () => {
            if (suppressedFocusOpenMenuId === menuId) {
                suppressedFocusOpenMenuId = undefined
                return
            }

            openMenu(menuId)
        })

        trigger.addEventListener('click', (event) => {
            if (
                event.detail === 0 &&
                suppressedKeyboardClickMenuId === menuId
            ) {
                suppressedKeyboardClickMenuId = undefined
                return
            }

            event.preventDefault()

            if (header.dataset.openMenu === menuId) {
                closeMenus()
                return
            }

            openMenu(menuId)
        })

        trigger.addEventListener('keydown', (event) => {
            if (!menuId) {
                return
            }

            if (
                event.key === 'Enter' ||
                event.key === ' ' ||
                event.key === 'ArrowDown'
            ) {
                event.preventDefault()
                suppressedKeyboardClickMenuId = menuId
                openMenu(menuId)
                focusSubmenuTrigger(menuId)
                return
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault()
                suppressedKeyboardClickMenuId = menuId
                openMenu(menuId)
                focusSubmenuTrigger(menuId, 'last')
                return
            }

            if (
                event.key === 'Tab' &&
                !event.shiftKey &&
                header.dataset.openMenu === menuId
            ) {
                const movedFocus = focusSubmenuTrigger(menuId)

                if (movedFocus) {
                    event.preventDefault()
                }
            }
        })
    })

    toElements<HTMLElement>(
        header.querySelectorAll('[data-submenu-trigger]')
    ).forEach((trigger) => {
        const menuId = trigger.dataset.menuGroup
        const itemId = trigger.dataset.submenuTrigger

        const selectItem = () => {
            setSelectedSubmenu(menuId, itemId)
        }

        trigger.addEventListener('pointerenter', selectItem)
        trigger.addEventListener('focus', selectItem)
        trigger.addEventListener('keydown', (event) => {
            const submenuTriggers = getSubmenuTriggers(menuId)

            if (
                event.key === 'Tab' &&
                event.shiftKey &&
                submenuTriggers[0] === trigger
            ) {
                event.preventDefault()
                getTrigger(menuId)?.focus()
                return
            }

            if (
                event.key === 'Tab' &&
                !event.shiftKey &&
                submenuTriggers[submenuTriggers.length - 1] === trigger
            ) {
                event.preventDefault()
                suppressedFocusOpenMenuId = menuId
                closeMenus()
                getTrigger(menuId)?.focus()
                return
            }

            if (event.key === 'Escape') {
                event.preventDefault()
                closeMenus()
                getTrigger(menuId)?.focus()
            }
        })
    })

    mobileGroupTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            setMobilePanel(trigger.dataset.mobileGroupTrigger)
        })
    })

    mobileBackButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setMobilePanel('root')
        })
    })

    mobileCloseButtons.forEach((button) => {
        button.addEventListener('click', closeMobileMenu)
    })

    mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu)
    })

    if (mobileOpenButton instanceof HTMLElement) {
        mobileOpenButton.addEventListener('click', openMobileMenu)
    }

    if (mobileOverlay instanceof HTMLElement) {
        mobileOverlay.addEventListener('click', (event) => {
            if (event.target === mobileOverlay) {
                closeMobileMenu()
            }
        })
    }

    header.addEventListener('pointerenter', clearCloseTimer)
    header.addEventListener('pointerleave', scheduleClose)
    header.addEventListener('focusout', (event) => {
        const nextTarget = event.relatedTarget

        if (!(nextTarget instanceof Node) || !header.contains(nextTarget)) {
            scheduleClose()
        }
    })

    document.addEventListener('pointerdown', (event) => {
        if (!(event.target instanceof Node) || header.contains(event.target)) {
            return
        }

        closeMenus()
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenus()
            closeMobileMenu()
        }
    })
}

toElements<HTMLElement>(document.querySelectorAll('[data-header-nav]')).forEach(
    (header) => {
        initHeader(header)
        const homePageLogo = header.querySelector('.home-page-logo')
        const homePageNavTriggers = toElements<HTMLElement>(
            header.querySelectorAll('.home-page-nav-trigger')
        )
        const homePageNavLinks = toElements<HTMLElement>(
            header.querySelectorAll('.home-page-nav-link')
        )
        const ctaButtonDefault = header.querySelector('.cta-button-default')
        const ctaButtonContrast = header.querySelector('.cta-button-contrast')
        const ctaButtonDefaultMobile = header.querySelector(
            '.cta-button-default-mobile'
        )
        const ctaButtonContrastMobile = header.querySelector(
            '.cta-button-contrast-mobile'
        )
        const homePageMobileMenuButton = header.querySelector(
            '.home-page-mobile-menu-button'
        )
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.setAttribute('data-scroll', 'true')
                header.classList.add('bg-white', 'shadow-md')
                header.classList.remove('bg-transparent')
                homePageLogo?.setAttribute('src', '/brand/knodia-logo.svg')
                homePageNavTriggers.forEach((trigger) => {
                    trigger.classList.remove('text-neutral-white')
                    trigger.classList.remove('hover:text-secondary-soft-quartz')
                    trigger.classList.add('text-neutral-graphite')
                    trigger.classList.add('hover:text-primary-violet')
                })
                homePageNavLinks.forEach((link) => {
                    link.setAttribute('tone', 'default')
                    link.classList.add('text-neutral-graphite')
                    link.classList.remove('hover:text-secondary-soft-quartz')
                    link.classList.add('hover:text-primary-violet')
                })

                ctaButtonContrast?.classList.add('hidden')
                ctaButtonDefault?.classList.remove('hidden')
                ctaButtonContrastMobile?.classList.add('hidden')
                ctaButtonDefaultMobile?.classList.remove('hidden')
                homePageMobileMenuButton?.classList.remove('text-neutral-white')
                homePageMobileMenuButton?.classList.remove(
                    'focus-visible:outline-neutral-white'
                )
                homePageMobileMenuButton?.classList.add('text-neutral-graphite')
                homePageMobileMenuButton?.classList.add(
                    'focus-visible:outline-primary-violet'
                )
            } else {
                header.setAttribute('data-scrol"l', 'false')
                header.classList.add('bg-transparent')
                header.classList.remove('bg-white', 'shadow-md')
                homePageLogo?.setAttribute('src', '/brand/knodia-logo-home.svg')

                homePageNavTriggers.forEach((trigger) => {
                    trigger.classList.remove('text-neutral-graphite')
                    trigger.classList.remove('hover:text-primary-violet')
                    trigger.classList.add('text-neutral-white')
                    trigger.classList.add('hover:text-secondary-soft-quartz')
                })
                homePageNavLinks.forEach((link) => {
                    link.setAttribute('tone', 'contrast')
                    link.classList.remove('text-neutral-graphite')
                    link.classList.add('hover:text-secondary-soft-quartz')
                    link.classList.remove('hover:text-primary-violet')
                })

                ctaButtonContrast?.classList.remove('hidden')
                ctaButtonDefault?.classList.add('hidden')
                ctaButtonContrastMobile?.classList.remove('hidden')
                ctaButtonDefaultMobile?.classList.add('hidden')
                homePageMobileMenuButton?.classList.add('text-neutral-white')
                homePageMobileMenuButton?.classList.add(
                    'focus-visible:outline-neutral-white'
                )
                homePageMobileMenuButton?.classList.remove(
                    'text-neutral-graphite'
                )
                homePageMobileMenuButton?.classList.remove(
                    'focus-visible:outline-primary-violet'
                )
            }
        })
    }
)
