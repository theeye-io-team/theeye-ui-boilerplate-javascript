import View from '../view'
import './style.less'

class Loader extends View {
  constructor (options={}) {
    super()

    this._message = options.text || 'LOADING...'

    this.template = `
      <div data-component="loader">
        <div class="top"></div>
        <div class="middle">
          <div class="message-box">
            <span class="message" data-hook="message"></span>
            <span class="progress" data-hook="progress"></span>
          </div>
        </div>
        <div class="bottom"></div>
      </div>`
  }

  render () {
    super.render()

    this.hide()
  }

  set message (message) {
    this._message = message
    this.el.querySelector('[data-hook=message]').innerHTML = message
  }

  show (message) {
    if (message) {
      this._message = message
    }
    this.el.querySelector('[data-hook=message]').innerHTML = this._message
    this.el.querySelector('[data-hook=progress]').innerHTML = ''
    this.el.style.display = 'block'
  }

  hide () {
    this.el.style.display = 'none'
  }

  progress (loaded, total) {
    this.el.querySelector('[data-hook=progress]').innerHTML = `${loaded}/${total}`
  }
}

export default Loader
