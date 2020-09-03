import View from '../view'
import './styles.less'

export default class Dialog extends View {
  constructor (options) {
    super(options)

    this.template = options.template || `
      <div data-component="dialog">
        <div class="dialog">
          <!-- dialog content -->
          <div class="dialog-content">
            <div class="dialog-header">
              <a data-hook="dialog-close" href="" class="close">X</a>
              <div class="title">${options.title}</div>
              <div class="clear"></div>
            </div>
            <div data-hook="dialog-body-container" class="dialog-body">
            </div>
            <div data-hook="dialog-footer-container" class="dialog-footer">
            </div>
          </div>
        </div>
      </div>
    `

    this.render()
  }

  render () {
    super.render()
    document.body.appendChild(this.el)

    this.dialog = this.el.querySelector('.dialog')

    window.onclick = (event) => {
      if (event.target == this.dialog) {
        this.hide()
      }
    }

    this.el
      .querySelector('a[data-hook=dialog-close]')
      .onclick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.hide()
      }


    this.renderBody()
    this.renderFooter()
  }

  renderBody () {
    let html = `<div>Body</div>`

    this.el
      .querySelector('[data-hook=dialog-body-container]')
      .innerHTML = html
  }

  renderFooter () {
    let html = `<div>Footer</div>`

    this.el
      .querySelector('[data-hook=dialog-footer-container]')
      .innerHTML = html
  }

  show () {
    this.dialog.style.display = "block"
  }

  hide () {
    //this.dialog.style.display = "none"
    this.destroy()
  }
}
