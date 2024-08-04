import { View, Text, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db, storage } from "../../config/FirebaseConfig";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

export default function addBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const {user}=useUser()
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };
  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: (doc.data()).name,
          value: (doc.data()).name,
        },
      ]);
    });
  };
  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();
    const imageRef = ref(storage, "business-app/" + fileName);
    
    try {
      await uploadBytes(imageRef, blob);
      console.log("File Uploaded");

      const downloadUrl = await getDownloadURL(imageRef);
      console.log(downloadUrl);

      await saveBusinessDetail(downloadUrl);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'New Business added successfully.'
      });
    } catch (error) {
      console.error('Error adding business:', error);
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  const saveBusinessDetail=async(imageUrl)=>{
    const businessDocRef = doc(db, 'BusinessList', Date.now().toString());
    await setDoc(businessDocRef,{
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      Category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl

    })
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'New Business added successfully.'
    });
    setLoading(false);

    // Alert.alert("New Business Added")

  }
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        {" "}
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add bew business
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginLeft: 10,
        }}
        onPress={() => {
          onImagePick();
        }}
      >
        {!image ? (
          <Image
            source={require("./../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>

      <View
        style={{
          marginLeft: 10,
          width: "95%",
        }}
      >
        <TextInput
        value={name}
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        value={address}
          placeholder="Address"
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        value={contact}
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        value={website}
          placeholder="Website"
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
        value={about}
          onChangeText={(v) => setAbout(v)}
          placeholder="About"
          multiline
          numberOfLines={5}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />
        <View
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(v) => setCategory(v)}
            items={categoryList}
          />
        </View>
        <TouchableOpacity
        disabled={loading}
        onPress={()=>onAddNewBusiness()}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          {loading?
          <ActivityIndicator size={'large'} color={'#fff'}/>:
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
