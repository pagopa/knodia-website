const roots = document.querySelectorAll<HTMLElement>(
    '[data-use-cases-cards-root]'
)

for (const root of roots) {
    const viewMoreWrapper = root.querySelector<HTMLElement>(
        '#use-cases-view-more-wrapper'
    )
    const viewMoreButton =
        viewMoreWrapper?.querySelector<HTMLElement>('a, button')

    if (!viewMoreWrapper || !viewMoreButton) {
        continue
    }

    const cards = Array.from(
        root.querySelectorAll<HTMLElement>('[data-use-case-card]')
    )
    const revealStepValue = Number(viewMoreWrapper.dataset.revealStep || '3')
    let visibleCount = Number(viewMoreWrapper.dataset.initialVisible || '0')

    const syncViewMoreState = () => {
        const hasHiddenCards = cards.some((card) =>
            card.classList.contains('hidden')
        )
        if (!hasHiddenCards) {
            viewMoreWrapper.classList.add('hidden')
        }
    }

    viewMoreButton.addEventListener('click', (event) => {
        event.preventDefault()

        const nextVisibleCount = Math.min(
            visibleCount + revealStepValue,
            cards.length
        )

        for (let index = visibleCount; index < nextVisibleCount; index++) {
            if (cards[index]) {
                cards[index].classList.remove('hidden')
            }
        }

        visibleCount = nextVisibleCount
        syncViewMoreState()
    })

    syncViewMoreState()
}
