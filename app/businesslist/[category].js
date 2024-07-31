import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const {category}=useLocalSearchParams();
  const [buisnessList, setBuisnessList] = useState([])
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle:category

    });

    getBusinessList();
    
  },[])
  // Used to get Business list by Category
  const getBusinessList=async ()=>{
    const q=query(collection(db,'BusinessList'),where("Category","==",category));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setBuisnessList(prev=>[...prev,doc.data()])
    })
  }
  
  return (
    <View>
      {buisnessList?.length>0?
      <FlatList
      data={buisnessList}
      renderItem={({item,index})=>(
        <BusinessListCard
        business={item}
        key={index}
        />
      )}
      />:
      <Text style={{
        fontFamily:"outfit-bold",
        fontSize:20,
        color:Colors.GRAY,
        textAlign:'center',
        marginTop:'50%'
      }}>
        No Business Found
      </Text>
    }
    </View>
  )
}