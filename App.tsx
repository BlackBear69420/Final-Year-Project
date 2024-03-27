import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Picker from './components/Picker'

const App = () => {
  return (<>
  <StatusBar backgroundColor='#e6e6fa' barStyle='dark-content'></StatusBar>
     <Picker/>
  </>

  )
}

export default App

const styles = StyleSheet.create({})