import View from '../view'
import './style.less'

class Prompt extends View {
  constructor (options={}) {
    super()

    this.template = `
      <div data-component="prompt">
        <div class="top"></div>
        <div class="middle">
          <div class="message-box">
            <span class="message" data-hook="message"></span>
            <span class="input-container">
              <input id="promptInput" type="text" name="input">
              <button data-hook="button">Enter</button>
            </span>
            <span class="error-message" data-hook="error-message">Invalid value</span>
          </div>
        </div>
        <div class="bottom"></div>
      </div>`
  }

  render () {
    super.render()

    this.el.querySelector('[data-hook=button]').addEventListener('click', this.onclick.bind(this), false)
    this.hide()
  }

  show (message, buttonText, callback) {
    this.el.querySelector('[data-hook=message]').innerHTML = message
    this.el.querySelector('[data-hook=button]').innerHTML = buttonText
    this.callback = callback

    this.el.style.display = 'block'
  }

  onclick () {
    let value = this.el.querySelector('#promptInput').value
    if (!value) {
      this.el.querySelector('[data-hook=error-message]').style.display = 'block'
    } else {
      this.callback(value)
    }
  }

  hide () {
    this.el.querySelector('[data-hook=message]').innerHTML = ''
    this.el.querySelector('[data-hook=button]').innerHTML = 'Enter'
    this.callback = null

    this.el.style.display = 'none'
  }
}

export default Prompt
