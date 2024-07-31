import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from "../../constants/Colors";
export default function BusinessListCard({business}) {
  return (
    <View style={{
      padding:10,
      margin:10,
      borderRadius:15,
      backgroundColor:"#fff",
      display:'flex',
      flexDirection:"row",
      gap:5,
      alignItems:'center'

    }}>
      <Image source={{uri:business.imageUrl}}
      style={{
        width:120,
        height:120,
        borderRadius:15
      }}
      />
      <View style={{
        flex:1,
        gap:7
      }}>

      <Text style={{
        fontFamily:"outfit-bold",
        fontSize:20,
      }}>{business.name}</Text>
      <Text style={{
        fontFamily:"outfit",
        color:Colors.GRAY,
        fontSize:15

      }}>{business.address}</Text>
      
      <View
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent:'space-between',
            }}
            >
            <Image
              style={{ width: 15, height: 15 }}
              source={require("./../../assets/images/star.png")}
              />
            <Text
              style={{
                fontFamily: "outfit",
              }}
              >
              4.5
            </Text>
          </View>
          </View>
    </View>
  )
}