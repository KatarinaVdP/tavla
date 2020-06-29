import firebase from 'firebase/app'
import 'firebase/firestore'
import { DocumentReference } from '@firebase/firestore-types'
import { Settings } from '../settings/index'

const SETTINGS_COLLECTION = 'Settings'

export const getSettings = async (id: string): Promise<Settings>  => {
    const document = await firebase.firestore().collection(SETTINGS_COLLECTION).doc(id).get()
    return document.data() as Settings
}

export const createDashboard = async (settings: Settings): Promise<DocumentReference> => {
    return firebase.firestore().collection(SETTINGS_COLLECTION).add(settings)
}
