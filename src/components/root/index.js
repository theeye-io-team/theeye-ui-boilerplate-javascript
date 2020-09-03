import View from '../view'
import Profile from '../profile'
import Login from '../login'
import './styles.less'

class Root extends View {
  constructor () {
    super()

    this.template = `
      <div data-component="root">
        <header>
          <div class="brand">
            <img src="images/logo.png" alt="The Eye">
            <span>TheEye-IO Boilerplate</span>
          </div>
          <div class="profile" data-hook="profile"></div>
        </header>
        <section data-hook="container"></section>
        <footer></footer>
      </div>
      `
  }

  render () {
    super.render()

    this.login = new Login({
      target: this.el.querySelector('[data-hook=container]')
    })

    this.profile = new Profile({
      target: this.el.querySelector('[data-hook=profile]')
    })
  }
}

export default Root
