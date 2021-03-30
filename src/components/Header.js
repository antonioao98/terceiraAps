import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';


export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: "https://unipam.edu.br/images/assets/logo1.png" }}
          style={styles.imagem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#447EFC",
    padding: 10
  },
  imagem: {
    width: 150,
    height: 25,
    justifyContent:"flex-start"
    
  }
})