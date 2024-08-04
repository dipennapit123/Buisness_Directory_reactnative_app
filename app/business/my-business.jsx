import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo'
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from './../../components/BusinessList/BusinessListCard'
import { useNavigation } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Colors } from '../../constants/Colors';
export default function MyBusiness() {
  const {user}=useUser()
  const[businessList,setBusinessList]=useState([]);
  const [loading,setLoading]=useState(false);
  const navigation=useNavigation()


  // used to get business list by user email

  useEffect(()=>{

    navigation.setOptions({
      headerShown:true,
      headerTitle:'My Business',
      headerStyle:{
        backgroundColor:Colors.PRIMARY
      },
    })
    user&&GetUserBusiness()
  },[user])
  const GetUserBusiness= async()=>{
    setLoading(true)
    setBusinessList([])
    const q= query(collection(db,'BusinessList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
    const querySnapshot=await getDocs(q)
    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])


    })
    setLoading(false)

  }
  return (
    <View style={{
      padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>MyBusiness</Text>
      <FlatList
      data={businessList}
      onRefresh={GetUserBusiness}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListCard
        business={item}
        key={index}

        />
      )}

      />
    </View>
  )
}