import View from '../view'
import './style.less'
import SessionActions from '../../store/actions/session'

class Profile extends View {
  constructor (options) {
    super(options)

    this.template = `
      <div data-component="profile">
        <div data-component="logged-in">
          Hola, <b data-hook="name"></b>

          <a class="round-btn" href="#" data-hook="logout">Salir</a>
        </div>
        <div data-hook="counter-container" style="position: absolute;top: 79px; right: 226px;"> </div>
      </div>
    `

    this.name = ""
    this.loggedId = false

    this.updateState = this.updateState.bind(this)
    this.updateState()

    this.onClickLogout = this.onClickLogout.bind(this)
    window.app.store.subscribe(this.updateState)
  }

  getState () {
    let session = window.app.store.getState().session
    if (session !== null) {
      let profile = (session.profile || {})
      this.name = (profile.name || '')
      this.loggedIn = true
    } else {
      this.loggedIn = false
    }
  }

  updateState () {
    this.getState()

    if (!this.loggedIn) {
      this.destroy()
    } else {
      this.render()
    }
  }

  renderProfile () {
    this.el.querySelector('[data-hook=name]').innerText = this.name

    this.el
      .querySelector('a[data-hook=logout]')
      .addEventListener('click', this.onClickLogout, false)
  }

  renderDocumentsCount () {
    let counter = new DocumentsCounter()
    this.renderChild(counter,'[data-hook=counter-container]')
  }

  render () {
    super.render()
    this.renderProfile()
    this.renderDocumentsCount()
  }

  onClickLogout (event) {
    window.app.store.dispatch(SessionActions.destroy())
  }
}

class DocumentsCounter extends View {
  constructor (options) {
    super(options)

    this.template = `
      <div data-component="documents-counter">
        Hay <strong data-hook="counter"></strong> Documentos pendientes
      </div>
      `
    this.counter = 0

    this.updateState = this.updateState.bind(this)
    this.updateState()
    window.app.store.subscribe(this.updateState)
  }

  getState () {
    this.counter = window.app.store.getState().counter || 0
  }

  updateState () {
    this.getState()
    this.render()
  }

  render () {
    super.render()
    this.el
      .querySelector('[data-hook=counter]')
      .innerText = this.counter 
  }
}

export default Profile
