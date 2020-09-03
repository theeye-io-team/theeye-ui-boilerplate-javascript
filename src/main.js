// fix regeneration-runtime error
import 'regenerator-runtime/runtime'

import Root from './components/root'
import Loader from './components/loader'
import Modal from './components/modal'
import store from './store'
import actions from './store/actions'
import apis from './apis'
import config from './config'
import 'bootstrap/scss/bootstrap.scss'

const app = {
  config,
  init () {
    let qs
    try {
      qs = readquerystring()
      if (qs.config) {
        Object.assign(app.config, qs.config)
      }
    } catch (err) {
      console.error('cannot load url settings')
      console.error(err)
    }

    if (qs.session) {
      app.store.dispatch(app.actions.session.set(qs.session))
    } else {
      app.store.dispatch(app.actions.session.restore())
    }

    app.load(qs)
  },
  render () {
    const container = document.body.querySelector('[data-hook=container]')
    const root = new Root()
    root.render()
    container.appendChild(root.el)
  },
  load (options={}) {
    app.loader.show('CARGANDO PERFIL')
    app.apis.session.getProfile(null, async (err, profile) => {
      if (err) {
        console.error(err)
        app.loader.hide()
        return
      }

      if (!profile) {
        app.loader.hide()
        return
      }

      app.loader.message = 'LOADING'
      // await something()..
      app.loader.hide()
    })
  },
  loadSession (data) {
    window.location.href = window.location.pathname + '?session=' + btoa(JSON.stringify(data))
  }
}

const readquerystring = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const config = urlParams.get('config')
  const session = urlParams.get('session')

  let qs = {}

  if (config) {
    try {
      qs.config = JSON.parse(atob(config))
    } catch (e) {
    }
  }

  // user credentials
  if (session) {
    try {
      qs.session = JSON.parse(atob(session))
    } catch (e) {
    }
  }

  //window.history.replaceState(qs, null, window.location.pathname)

  return qs
}

window.app = app
window.app.apis = apis
window.app.actions = actions
window.app.store = store.create()

const main = () => {
  // use loader
  const loader = new Loader()
  loader.render()
  document.body.appendChild(loader.el)
  window.app.loader = loader

  app.init()
  app.render()
}

main()
