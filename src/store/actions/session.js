export default {
  restore () {
    return { type: 'RESTORE_SESSION' }
  },
  destroy () {
    return { type: 'DESTROY_SESSION' }
  },
  set (data) {
    let { ttl, created, userId } = data
    return {
      type: 'SET_SESSION',
      session: {
        token: data.id,
        ttl,
        created,
        userId
      }
    }
  },
  setProfile (data) {
    return {
      type: 'SET_PROFILE',
      profile: {
        customer_id: (data.customer && data.customer.id),
        active_document_id: data.active_document_id,
        name: data.name
      }
    }
  }
}
