import View from '../view'
import Dummy from '../dummy'
import Profile from '../profile'
import Login from '../login'
import './styles.less'
import logo from 'assets/images/logo.png'

class Root extends View {
  constructor () {
    super()

    this.template = `
      <div data-component="root">
        <header>
          <div class="brand">
            <img src="${logo}" alt="The Eye">
            <span>TheEye-IO Boilerplate</span>
          </div>
          <div class="profile" data-hook="profile"></div>
        </header>
        <section data-hook="container"></section>
        <footer></footer>
      </div>
      `

    this.updateState = this.updateState.bind(this)
    this.updateState()
    window.app.store.subscribe(this.updateState)
  }

  getSessionState () {
    //sample
    return window.app.store.getState().session
  }

  updateState() {
    let session = this.getSessionState()
    if (session && session.profile) {
      this.dummy.render()
      this.el
        .querySelector('[data-hook=container]')
        .appendChild(this.dummy.el)
    } else {
      if (this.dummy) {
        this.dummy.destroy()
      }
    }
  }

  render () {
    super.render()

    new Login({
      target: this.el.querySelector('[data-hook=container]')
    })

    new Profile({
      target: this.el.querySelector('[data-hook=profile]')
    })

    // will be appended into section[data-hook=container]
    this.dummy = new Dummy({ })
  }
}

export default Root
