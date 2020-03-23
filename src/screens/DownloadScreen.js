import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { H1, Container, Header, Body, Content, Left, Right, Button, Icon, List, ListItem } from 'native-base';
import { PRIMARY_COLOR, FADE_COLOR, PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'expo';

class BookViewScreen extends Component{

  render(){

    return (
      <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Header transparent iosBarStyle={"light-content"}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' style={{marginLeft:5, fontSize: 26, color: PRIMARY_FONT_COLOR}}/>
            </Button>
          </Left>
          <Body/>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 15, marginBottom: 15}}>
            <H1 style={styles.header}>Payment</H1>
            <Text style={{color: FADE_COLOR}}>Payment is required to download or listen to this audio book</Text>
          </View>
          <List>
            <ListItem itemDivider style={{backgroundColor: '#272727'}}>
              <Text style={{color: PRIMARY_FONT_COLOR}}>Payment Methods</Text>
            </ListItem>
            <ListItem onPress={() => Linking.openURL('https://esewa.com.np')}>
              <Left style={styles.item}>
                <Image style={styles.paymentLogo} source={require('../../assets/esewa.png')}/>
                <Text style={{color: PRIMARY_FONT_COLOR}}>eSewa</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={() => Linking.openURL('https://khalti.com')}>
              <Left style={styles.item}>
                <Image style={styles.paymentLogo} source={require('../../assets/khalti.png')}/>
                <Text style={{color: PRIMARY_FONT_COLOR}}>Khalti</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    color: PRIMARY_FONT_COLOR
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  paymentLogo: {
    height: 30,
    width: 30,
    marginRight: 10
  }
})



export default BookViewScreen;
