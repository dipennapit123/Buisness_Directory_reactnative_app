import { View, Text } from 'react-native'
import React from 'react'
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo'
import { db } from '../../config/FirebaseConfig';

export default function MyBusiness() {
  const {user}=useUser
  const GetUserbusiness=()=>{
    const q= query(collection(db,'BusinessList'),where)

  }
  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>MyBusiness</Text>
    </View>
  )
}