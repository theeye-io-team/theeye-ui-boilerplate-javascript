import View from '../view'
import './style.less'

class ToggleButton extends View {
  constructor (options) {
    super()
    this.value = options.value
    this.checked = this.value ? 'checked' : ''
    this.template =
    `<div class="toggle-blocks-button">
      <span class="button-label">
        ${options.label}
      </span>
      <label class="switch">
        <input type="checkbox" ${this.checked}>
        <span class="slider"></span>
      </label>
    </div>`
    this.onclick = options.onclick
  }

  render () {
    let self = this
    super.render()
    this.el.getElementsByClassName('switch')[0].addEventListener('click', function (event) {
      self.toggle(event)
    }, false)
  }
  toggle (event) {
    if (event.target.type === 'checkbox') {
      this.value = !this.value
      this.onclick(event)
    }
  }
}

export default ToggleButton
