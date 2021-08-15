import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

if (!firebase.apps.length) {
  let config = {}
  if (location.hostname === 'localhost') {
    console.log('🏠 ローカル開発環境')
    config = {
      apiKey: "AIzaSyDLogbppEsRdvR6zGZAUOXfQ6RMYdU7JsA",
      authDomain: "extentions-sample.firebaseapp.com",
      projectId: "extentions-sample",
      storageBucket: "extentions-sample.appspot.com",
      messagingSenderId: "300178241063",
      appId: "1:300178241063:web:d1de3c72ec206eff334002",
      measurementId: "G-E6CKPFDZLE"
    }
  } else {
    console.log('🔥 Firebase ホスティング環境')
    config = JSON.parse(loadTextFileAjaxSync('/__/firebase/init.json', 'application/json'))
  }
  firebase.initializeApp(config)
}

export default firebase

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export const functions = firebase.app().functions('asia-northeast1')
export const db = firebase.firestore()
export const firestore = firebase.firestore

function loadTextFileAjaxSync(filePath, mimeType) {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', filePath, false)
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType)
    }
  }
  xmlhttp.send()
  if (xmlhttp.status === 200) {
    return xmlhttp.responseText
  } else {
    throw new Error('loadTextFileAjaxSync() response error', xmlhttp.status)
  }
}
