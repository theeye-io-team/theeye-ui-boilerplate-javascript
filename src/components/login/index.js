import View from '../view'
import './style.less'

class Login extends View {
  constructor (options) {
    super(options)

    this.template = `
      <div data-component="login">

      <h1>TheEye</h1>
      <h2>Login</h2>
        <form>
          <div >
            <input type="text" name="email" placeholder="email" required style="">
          </div>
          <div >
            <input type="password" name="password" placeholder="password" required >
          </div>

          <div data-hook="submit">
            <input type="submit" name="submit" value="Iniciar Session" class="submit-btn">
          </div>
        </form>
      </div>
      `

    this.onClickSubmit = this.onClickSubmit.bind(this)
    this.updateState = this.updateState.bind(this)
    this.updateState() // autorender
    window.app.store.subscribe(this.updateState)
  }

  getState () {
    let session = window.app.store.getState().session
    this.token = session !== null ? session.token : null
  }

  render () {
    super.render()
    this.el
      .querySelector('input[name=submit]')
      .addEventListener('click', this.onClickSubmit, false)

    this.el.querySelector('input[name=email]').focus()
  }

  updateState () {
    this.getState()

    if (!this.token) {
      if (this.rendered !== true) {
        this.render()
      }
    } else {
      this.destroy()
    }
  }

  onClickSubmit (event) {
    event.preventDefault()

    let form = this.el.querySelector('form')

    let email = form.querySelector('input[name=email]').value
    let password = form.querySelector('input[name=password]').value

    if (email && password) {
      app.apis.session.login(email, password)
    }
  }
}

export default Login
