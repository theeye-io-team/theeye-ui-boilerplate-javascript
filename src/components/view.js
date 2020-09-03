
class View {
  constructor (options={}) {
    this.rendered = false

    this.target = options.target
  }

  renderDomElem () {
    if (this.rendered) {
      //throw Error('already rendered. re-render not implemented, destroy the element first')
      this.destroy()
    }

    let el = document.createElement('div')
    if (!this.template) {
      throw Error('this view requires a template')
    }
    el.innerHTML = this.template
    this.el = el.firstElementChild
    this.bindEvents()
    this.rendered = true

    if (this.target) {
      this.target.appendChild(this.el)
    }

    return this.el
  }

  render () {
    this.renderDomElem()
  }

  reRender () {
    if (this.rendered === true) {
      this.destroy()
    }

    this.render()
  }

  renderChild (child, container) {
    let el
    if (container.constructor.name === 'HTMLDivElement') {
      el = container
    } else if (container.constructor.name === 'String') {
      el = this.el.querySelector(container)
    }

    if (!el) {
      console.error('cannot append child. selector not found')
      return
    }

    child.render()
    el.appendChild(child.el)
  }

  destroy () {
    if (this.rendered === true) {
      this.rendered = false
      this.el.remove()
    }
  }

  bindEvents () {}
}

export default View
