function sendEditEvent(section: string) {
  const event = new CustomEvent('edit', { detail: section })

  window.dispatchEvent(event)
}

export default sendEditEvent
