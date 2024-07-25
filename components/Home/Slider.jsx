import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Slider() {
    useEffect(()=>{
        GetSliderList();
    },[])
  const GetSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
        console.log(doc.data());
    })
  };
  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
