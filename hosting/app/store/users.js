import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

import { CommonFunctions as CF } from '@/store/CommonFunctions'

export const state = () => ({})

const getCollection = () => {
  return db.collection('users')
}

export const actions = {
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
}

export const mutations = {}

export const getters = {}