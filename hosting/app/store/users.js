import { firestoreAction } from 'vuexfire'
import * as algoliasearch from 'algoliasearch'
import { db } from '@/plugins/firebase'

import config from '@/algolia.config'

import { CommonFunctions as CF } from '@/store/CommonFunctions'

const algoliaClient = algoliasearch(config.appId, config.apiKey)
const userIndex = algoliaClient.initIndex('test_firestore')

export const state = () => ({
  list: []
})

const getCollection = () => {
  return db.collection('users')
}

export const actions = {
  setListRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('list', getCollection().orderBy('createdAt', 'desc'), {
      serialize: CF.serialize
    })
    console.log('done')
  }),
  add: firestoreAction(async (_, { doc }) => {
    const ref = getCollection()
    await ref.add(CF.setTimestamp(doc)).catch((e) => console.log(e))
  }),
  get: firestoreAction(async (_, { id }) => {
    const ref = getCollection().doc(id)
    const doc = await ref.get().catch((e) => console.log(e))
    const data = CF.getData(doc)
    return data
  }),
  update: firestoreAction(async (_, { id, doc }) => {
    const ref = getCollection().doc(id)
    await ref.update(doc).catch((e) => console.log(e))
  }),
  search: async (_, { query }) => {
    return await userIndex.search(query)
  }
}

export const mutations = {}

export const getters = {
  list: (state) => state.list
}