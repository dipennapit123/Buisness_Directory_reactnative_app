import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

const home = () => {
  return (
    <ScrollView>
      {/* Header */}
      <Header/>

      {/* Slider */}
      <Slider/>

      {/* Category */}
      <Category/>
      {/* Popular Buisness List  */}
      <PopularBusiness/>
      <View style={{height:30}}>

      </View>
    </ScrollView>
  )
}

export default home