export default {
  restore () {
    return { type: 'RESTORE_SESSION' }
  },
  destroy () {
    return { type: 'DESTROY_SESSION' }
  },
  set (data) {
    //let { ttl, created, userId } = data
    let { access_token } = data
    return {
      type: 'SET_SESSION',
      session: {
        token: access_token
      }
    }
  },
  setProfile (data) {
    return {
      type: 'SET_PROFILE',
      profile: {
        customer_id: (data.customer && data.customer.id),
        name: data.name
      }
    }
  }
}
