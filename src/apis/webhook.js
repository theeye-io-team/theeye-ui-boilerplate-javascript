
export default {
  trigger (url, body, next = (() => {})) {
    let filename = body.filename
    // remove page extension
    let matched = filename.match(/^.*(-[0-9]_train).json$/)
    if (matched !== null) {
      body.filename = filename.replace(matched[1], '')
    }

    let jsonBody = JSON.stringify(body)
    const request = new XMLHttpRequest()
    window.app.loader.show('Wait')
    request.onreadystatechange = () => {
      if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status === 200) {
          alert('triggered')
        } else {
          alert('Error saving tags, try again later.')
        }
        window.app.loader.hide()
        next()
      }
    }
    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(jsonBody)
  }
}
