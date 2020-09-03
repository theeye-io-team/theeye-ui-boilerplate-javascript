import View from '../view'
import './styles.less'
import $ from 'jquery'
import 'bootstrap'
export default class Modal extends View {
  constructor(options) {
    super(options)
    this.tags = []
    Object.assign(this, options)
    this.template = `
      <div data-component="modal">
        <div class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header border-bottom-0">
                <h5 class="modal-title">${options.title}</h5>
                <button data-hook="modal-close" type="button" class="close" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div data-hook="modal-body" class="modal-body">${options.body || ''}</div>
              <div data-hook="modal-footer-container" class="modal-footer border-top-0"></div>
            </div>
          </div>
        </div>
      </div>
      `
    this.render()
  }
  render() {
    super.render()
    document.body.appendChild(this.el)
    let container = this.el.querySelector('.modal')

    let $modal = $(container)
    $modal.modal({ keyboard: false, backdrop: 'static', show: true })

    this.$modal = $modal
    this.el
      .querySelector('button[data-hook=modal-close]')
      .onclick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        $('.modal-backdrop').remove()
        $modal.modal('hide')
      }
    this.renderFooter()
  }
  renderFooter() {
    let html = `<div></div>`
    this.el
      .querySelector('[data-hook=modal-footer-container]')
      .innerHTML = html
  }
  show() {
    this.el.querySelector('.modal').style.display = 'block'
  }
}
