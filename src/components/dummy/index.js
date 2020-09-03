import View from '../view'
import './styles.less'

class Dummy extends View {
  constructor () {
    super()

    this.template = `
      <div data-component="dummy">
        Dummy Component! Start Here.
        <div data-hook="another-container">
        </div>
      </div>
      `
  }

  /**
   * set component state
   */
  getState () {
    //this.dummyState = window.app.store.getState().dummy
  }

  render () {
    super.render(arguments)
  }
}

export default Dummy
