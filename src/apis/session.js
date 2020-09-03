import SessionActions from '../store/actions/session'
import http from 'superagent'
import config from 'config'

const gateway = config.api.gateway

export default {
  login (username, password) {
    window.app.loader.show('LOADING...')
    const url = `${gateway}/auth/login`
    http  
      .post(url)
      //.send({ username, password }) // query string
      .set('accept', 'application/json')
      .set('content-type', 'application/json')
      .auth(username, password)
      .end((err, response) => {
        if (err) {
          if (err.status === 401) {
            window.app.loader.hide()
            return
          }
        }
        let session = response.body
        window.app.store.dispatch(app.actions.session.set(session))
        window.app.load()
      })
  },
  getProfile (access_token = null, next) {
    next || (next = ()=>{})

    if (access_token===null) {
      let session = window.app.store.getState().session
      if (session && session.token) {
        access_token = session.token
      }
    }

    if (!access_token) {
      return next()
    }

    const url = `${gateway}/session/profile`

    http  
      .get(url)
      .query({ access_token }) // query string
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        let profile = response.body
        if (err) {
          window.app.store.dispatch(SessionActions.destroy())
          return next(err)
        }

        window.app.store.dispatch(SessionActions.setProfile(profile))
        next(null, profile)
      })
  }
}
