class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      console.log('here?')
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault()
      }
    })
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' })
