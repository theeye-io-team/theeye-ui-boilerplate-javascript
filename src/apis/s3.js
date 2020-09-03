//import hmacsha1 from 'crypto-js/sha1'
import config from 'config'
const S3 = require('aws-sdk/clients/s3')

export default {
  putAnnotation (options) {
    let { filename, tags, progressfn, done } = options
    const s3cfg = config.aws.s3
    const s3 = new S3(s3cfg)
    const params = {
      Body: JSON.stringify(tags),
      Bucket: s3cfg.bucket,
      ACL: 'bucket-owner-full-control',
      Key: options.key
    }
    //window.app.loader.show()
    const request = s3.putObject(params)
    request.on('httpUploadProgress', progressfn)
    request.send((err, response) => {
      //window.app.loader.hide()
      if (err) {
        console.error(err, err.stack) // an error occurred
        return done(err)
      }
      return done(null)
    })
  },
  getAnnotation (options) {
    let { filename, progressfn, done } = options
    const s3cfg = config.aws.s3
    const s3 = new S3(s3cfg)
    const params = {
      Bucket: s3cfg.bucket,
      Key: options.key //`${s3cfg.key_prefix}/${filename}`
    }
    //window.app.loader.show()
    const request = s3.getObject(params)
    request.on('httpDownloadProgress', progressfn)
    request.send((err, response) => {
      //window.app.loader.hide()
      if (err) {
        alert('the document file was not found')
        console.error(err.message) // an error occurred
        return done(err)
      }
      let json = new TextDecoder('utf-8').decode(response.Body)
      let documents = JSON.parse(json)
      return done(null, documents[0])
    })
  }
}
