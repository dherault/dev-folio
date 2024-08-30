// https://gist.github.com/rijkvanzanten/df73ae28e80b9c6e5030baed4d1a90a6
function calculateElementVisibilityPercentage(element: HTMLElement) {
  const viewport = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
  }

  const elementBoundingRect = element.getBoundingClientRect()
  const elementPos = {
    top: elementBoundingRect.y + window.scrollY,
    bottom: elementBoundingRect.y + elementBoundingRect.height + window.scrollY,
  }

  if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
    return 0
  }

  // Element is fully within viewport
  if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
    return 100
  }

  // Element is bigger than the viewport
  if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
    return 100
  }

  const elementHeight = elementBoundingRect.height
  let elementHeightInView = elementHeight

  if (elementPos.top < viewport.top) {
    elementHeightInView = elementHeight - (window.scrollY - elementPos.top)
  }

  if (elementPos.bottom > viewport.bottom) {
    elementHeightInView -= (elementPos.bottom - viewport.bottom)
  }

  const percentageInView = (elementHeightInView / window.innerHeight) * 100

  return Math.round(percentageInView)
}

export default calculateElementVisibilityPercentage
