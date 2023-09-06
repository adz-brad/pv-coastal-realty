import firebase from "./app";
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore'

const firestore = getFirestore(firebase)
const listingsRef = collection(firestore, 'properties')

export const getProperties = async () => {
    const res = await getDocs(listingsRef)
    let listings = []
    res.forEach(doc => listings.push(doc.data()))
    return listings
}

export const getProperty = async (mlv) => {
    const ref = doc(firestore, 'properties', `${mlv}`)
    const res = await getDoc(ref)
    return res.data()
}