import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Image, PermissionsAndroid, Platform, ScrollView } from 'react-native';
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker';

const Picker = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<ImageType | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<ImageType | null>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      setSelectedImage(image);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const handleImageUpload2 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      setSelectedImage2(image);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };
  const handleImageUpload3 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });
      setSelectedImage3(image);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  // const handleCameraUpload = async () => {
  //   try {
  //     const image = await ImagePicker.openCamera({
  //       cropping: true,
  //     });
  //     setSelectedImage(image);
  //   } catch (error) {
  //     console.log('ImagePicker Error: ', error);
  //   }
  // };

  return (
    <ScrollView>
       <View style={{flex:1,alignItems:'center',justifyContent:'center',gap:20,padding:20,backgroundColor:'#f8f4ff',marginTop:40}}>
      
      <Pressable
        style={{
          backgroundColor: '#4169e1',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: '80%',
          borderRadius: 10,
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          marginBottom: 20,
        }}
        onPress={handleImageUpload}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Top View</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: '#4169e1',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: '80%',
          borderRadius: 10,
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          marginBottom: 20,
        }}
        onPress={handleImageUpload2}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Side View</Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: '#4169e1',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: '80%',
          borderRadius: 10,
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          marginBottom: 20,
        }}
        onPress={handleImageUpload3}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Bottom View</Text>
      </Pressable>

      {/* <Pressable
        style={{
          backgroundColor: '#4169e1',
          borderColor: '#C0C0C0',
          borderWidth: 1,
          width: '80%',
          borderRadius: 10,
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}
        onPress={handleCameraUpload}>
        <Text style={{ fontSize: 16, color: '#fff' }}>Take a Photo</Text>
      </Pressable> */}
      
      {selectedImage && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: 'white',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}>
            <Text style={{color:'#1f75fe',fontSize:18,}}>Top</Text>
          <Image
            source={{ uri: selectedImage.path }}
            style={{
              width: 300,
              height: 220,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            alt="Selected Image"
          />
        </View>
      )}
      {selectedImage2 && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: 'white',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}>
            <Text style={{color:'#1f75fe',fontSize:18,}}>Side</Text>
          <Image
            source={{ uri: selectedImage2.path }}
            style={{
              width: 300,
              height: 220,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            alt="Selected Image"
          />
        </View>
      )}
      {selectedImage3 && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: 'white',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}>
            <Text style={{color:'#1f75fe',fontSize:18,}}>Bottom</Text>
          <Image
            source={{ uri: selectedImage3.path }}
            style={{
              width: 300,
              height: 220,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            alt="Selected Image"
          />
        </View>
      )}

    </View>
    </ScrollView>
   
  );
};

export default Picker;

const styles = StyleSheet.create({});
