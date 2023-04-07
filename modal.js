class Modal extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.isOpen = false
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0, 0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal{
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal {
          top: 15vh;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26)
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }

        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
          margin: 0;
        }

        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 1rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title"></title>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Confirm</button>
        </section>
      </div>
    `

    const slots = this.shadowRoot.querySelectorAll('slot')
    slots[1].addEventListener('slotchange', (event) => {
      console.dir(slots[1].assignedNodes())
    })

    const confirmButton = this.shadowRoot.querySelector('#confirm-btn')
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn')
    const backdrop = this.shadowRoot.querySelector('#backdrop')

    backdrop.addEventListener('click', this._cancel.bind(this))
    cancelButton.addEventListener('click', this._cancel.bind(this))
    confirmButton.addEventListener('click', this._confirm.bind(this))
    // cancelButton.addEventListener('cancel', () => {
    //   console.log('cancel inside the component')
    // })
  }

  // attributeChangedCallback(name, oldValue, newValue) {}

  // static get observedAttributes() {
  //   return ['opened']
  // }

  // convention: public method is written without _ as prefix.
  open() {
    this.setAttribute('opened', '')
    this.isOpen = true
  }

  hide() {
    this.hasAttribute('opened') && this.removeAttribute('opened')
    this.isOpen = false
  }

  // using bubbles and composed
  _cancel(event) {
    this.hide()
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true})
    event.target.dispatchEvent(cancelEvent)
  }

  _confirm() {
    this.hide()
    const confirmEvent = new Event('confirm')
    // *this* below revers to HTMLElement
    this.dispatchEvent(confirmEvent)
  }
}

customElements.define('uc-modal', Modal)
