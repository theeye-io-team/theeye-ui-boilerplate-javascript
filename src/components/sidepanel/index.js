import View from '../view'
import './styles.less'
import { TagsList } from '../../tags-list'
import { InvisibleStoreTag } from '../../model/tag'

class SidePanel extends View {
  constructor () {
    super()

    this.sectionsViews = []
    this.hiddenSections = false

    this.template = `
      <div data-component="sidepanel">
        <div class="toggle-button">
          <a data-hook="toggle">&#x3E;</a>
        </div>
        <div class="titulo">
						<span class="title">TAGS</span>
						<span class="icon">
							<a data-hook="collapse" href="#">ocultar</a>
						</span>
        </div>
        <div class="search">
            <form>
                <input type="text" placeholder="Buscar tags" class="float-left" data-hook="search"  />
            </form>
        </div> 
        <div class="tags-container">
          <div data-hook="container"></div>
        </div>
      </div>
      `

    this.onClickToggle = this.onClickToggle.bind(this)
    this.onClickCollapse = this.onClickCollapse.bind(this)
    this.onClickSearch = this.onClickSearch.bind(this)
  }

  render () {
    super.render()

    let toggle = this.el.querySelector('[data-hook=toggle]')
    toggle.addEventListener('click', this.onClickToggle, false)

    let collapse = this.el.querySelector('[data-hook=collapse]')
    collapse.addEventListener('click', this.onClickCollapse, false)

    let search = this.el.querySelector('[data-hook=search]')
    search.addEventListener('keyup', this.onClickSearch, false)
    
    this.renderTags()

  }

  renderTags () {
    TagsList.forEach(tag => {
      let tagsSection = new TagsSection({
        target: this.el.querySelector('[data-hook=container]'),
        title: tag.value
      })

      tagsSection.render()

      this.sectionsViews.push(tagsSection)
    })
  }

  onClickToggle () {
    this.toggle()
  }

  onClickCollapse (event) {
    let el = this.el.querySelector('[data-hook=collapse]')
    // console.log('en on collapse',el)
    if (this.hiddenSections === false) {
      el.innerHTML = 'ver todo'
      this.sectionsViews.forEach(section => {
        if (section.tags.length === 0) {
          section.el.style.display = 'none'
        }
      })
    } else {
      el.innerHTML = 'ocultar'
      this.sectionsViews.forEach(section => {
        if (section.tags.length === 0) {
          section.el.style.display = 'flex'
        }
      })
    }

    this.hiddenSections = (!this.hiddenSections)
  }

  toggle () {
    this.el.classList.toggle('visible')
    this.el.children[1].children[0].classList.toggle('hide')
    this.el.children[1].children[1].classList.toggle('hide')
    this.el.children[2].classList.toggle('hide')
    this.el.children[3].classList.toggle('hide')
    let btn = this.el.querySelector('[data-hook=toggle]')
    this.hiddenSections === false ? btn.innerHTML = '&#x3C;' : btn.innerHTML = '&#x3E;'
    this.hiddenSections = (!this.hiddenSections)
  }

  onClickSearch (event) {
    let el = this.el.querySelector('[data-hook=searchbtn]')
    let input = this.el.querySelector('[data-hook=search]').value.toLowerCase()
    if (input.length >= 3 || input.length == 0) {
      this.sectionsViews.forEach(section => {
        section.el.style.display = 'none'
        if (section.el.innerText.toLowerCase().indexOf(input) != -1) {
          section.el.style.display = 'block'
        } 
      })
    }

  }

}

export default SidePanel

/**
 *
 * group several values for one tag
 *
 */
class TagsSection extends View {
  constructor (options) {
    super(options)

    this.title = options.title
    this.tagViews = []
    this.tags = []

    this.template = `
      <div data-component="tag-list-item">
        <div class="title">
          <span>${this.title}</span>
          <button data-hook="creator"><span class="rounded-btn green float-right">+</span></button>
        </div>
        <div data-hook="tags" class="tags-container" ></div>
      </div>
    `

    this.updateState = this.updateState.bind(this)
  }

  getState () {
    let tags = window.app.store
      .getState()
      .tags
      .filter(tag => tag.name === this.title)

    if (tags.length != this.tags.length) {
      this.tags = tags
      return true
    } else {
      return false
    }
  }

  updateState () {
    let hasChanged = this.getState()
    if (hasChanged) {
      // re render
      this.renderTagItems()
    }
  }

  render () {
    super.render()
    this.updateState()
    window.app.store.subscribe(this.updateState)

    this.el
      .querySelector('[data-hook=creator]')
      .addEventListener('click', this.createTag.bind(this), false)
  }

  createTag (event) {
    let editor = new TagEditor({
      title: `Ingrese el valor para ${this.title}`,
      text: "",
      onsave: (err, text) => {
        let tag = new InvisibleStoreTag({ name: this.title, text })
      }
    })

    editor.render()
  }

  renderTagItems () {
    this.tagViews.forEach(view => view.destroy())
    this.tagViews = []

    this.tags.forEach(tag => {
      let tagItem = new TagItem({
        tag,
        target: this.el.querySelector('[data-hook=tags]')
      })
      tagItem.render()
      this.tagViews.push(tagItem)
    })
  }
}

class TagItem extends View {
  constructor (options) {
    super(options)

    this.id = options.tag.id
    this.text = options.tag.text

    this.template = `
      <div data-component="tag-item">
        <span class="tag-text">${this.text.length > 15 ? this.text.substring(0,15)+'...' : this.text}</span>
        <span class="actions">
          <a data-hook="remove" class="remove-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="&#10;    width: 20px;&#10;    height: 20px;&#10;">
              <path class="remove" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/>
            </svg>
          </a>
          <a data-hook="edit" class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path class="edit" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/>
            </svg>
          </a>
        </span>
        <div data-hook="tag-editor-container"></div>
      </div>
      `

    this.updateState = this.updateState.bind(this)
  }

  render () {
    super.render()
    this.el
      .querySelector('[data-hook=remove]')
      .addEventListener('click', this.removeTag.bind(this), false)

    this.el
      .querySelector('[data-hook=edit]')
      .addEventListener('click', this.editTagValue.bind(this), false)

    window.app.store.subscribe(this.updateState)
  }

  updateState () {
    let tag = window.app.store
      .getState()
      .tags
      .find(tag => tag.id === this.id)

    if (tag === undefined) {
      // tag removed
      this.destroy()
    } else {
      // update text
      if (this.text !== tag.text) {
        this.text = tag.text
        this.el.querySelector('.tag-text').innerHTML = this.text
      }
    }
  }

  removeTag () {
    window.app.store.dispatch(app.actions.tags.remove(this.id))
  }

  editTagValue () {
    let editor = new TagEditor({
      text: this.text,
      onsave: (err, text) => {
        app.store.dispatch( app.actions.tags.changeText(this.id, text) )
      }
    })

    editor.render()
  }
}

class TagEditor extends View {
  constructor (options) {
    super()

    let { text, title, onsave } = options

    if (!title) {
      title = text
    }

    this.template = `
      <div data-component="tag-editor">
        <div data-hook="tag-editor-body" class="tag-editor-body">
          <div>
            <strong>EDITAR ${ title.length > 15 ? title.substring(0,15) + `...` : title} </strong>
          </div>
          <div>
            <input data-hook="tag" value="${text}">
            <div class="btn-container">
              <button data-hook="cancel" class="cancel-btn">CANCELAR</button>
              <button data-hook="save" class="save-btn">GUARDAR</button>
            </div>
          </div>
        </div>
      </div>
      `

    this.onsave = onsave||(() => {})

    this.onKeyPressed = this.onKeyPressed.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
  }

  onKeyPressed (event) {
    if (event.code == 'Enter') {
      this.onsave(this.choices.getValue().value)
      this.remove()
    }
  }

  render () {
    super.render()
    document.body.querySelector('[data-component=root]').appendChild(this.el)
    this.input = this.el.querySelector('input')
  }

  bindEvents () {
    let save = this.el.querySelector('button[data-hook=save]')
    let cancel = this.el.querySelector('button[data-hook=cancel]')
    save.addEventListener('click', this.onClickSave, false)
    cancel.addEventListener('click', this.onClickCancel, false)
  }

  onClickSave (event) {
    this.onsave(null, this.input.value)
    this.remove()
  }

  onClickCancel (event) {
    window.getSelection().empty()
    this.remove()
  }

  remove () {
    let save = this.el.querySelector('button[data-hook=save]')
    let cancel = this.el.querySelector('button[data-hook=cancel]')
    save.removeEventListener('click', this.onClickSave)
    cancel.removeEventListener('click', this.onClickCancel)
    this.el.remove()
  }
}
