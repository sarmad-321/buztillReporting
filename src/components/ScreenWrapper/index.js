import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils/theme'

const ScreenWrapper = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default ScreenWrapper


const styles = StyleSheet.create({
    container : { 
        flex : 1,
        paddingTop : "2%",
        backgroundColor: colors.background
    }
})