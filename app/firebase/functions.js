'use server'

import firebase from "./app";
import { getFirestore, doc, getDoc, documentId, getDocs, query, where, collection } from 'firebase/firestore'

const firestore = getFirestore(firebase)

export const getProperty = async (mlv) => {
    const ref = doc(firestore, 'properties', `${mlv}`)
    const res = await getDoc(ref)
    return res.data()
}

export const getFeatured = async (featured) => {
    const q = query(collection(firestore, "properties"), where(documentId(), "in", featured))
    const snap = await getDocs(q)
    let properties = []
    snap.forEach((doc) => {
        const property = doc.data()
        delete property.sortDate
        properties.push(property)
    })
    return properties
}