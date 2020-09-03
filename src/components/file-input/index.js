import View from '../view'
import './style.less'

class FileInput extends View {
  constructor (opts) {
    super()

    this.template = `
      <div data-component="file-input">
        <label for="file" class="button">
          Select annotation file
        </label>
        <input id="file" type="file" name="file" style="display:none" />
      </div>
    `

    this.onChange = this.onChange.bind(this)
    this.onContent = opts.onContent
  }

  bindEvents () {
    let input = this.el.querySelector('input')
    input.addEventListener('change', this.onChange, false)
  }

  onChange (event) {
    let file = event.target.files[0]

    if (file) {
      var reader = new window.FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = (event) => {
        this.onContent(event.target.result)
      }
      reader.onerror = (event) => {
        alert('error reading file')
      }
    }
  }
}

export default FileInput
