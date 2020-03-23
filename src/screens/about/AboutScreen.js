import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Button, Right } from 'native-base';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR } from '../../constants/Colors';

export default ({navigation}) => (
  <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>

    <Header transparent iosBarStyle={"light-content"} style={{backgroundColor: '#191919', borderBottomWidth: 0}}>
      <Left>
        <Button transparent onPress={() => navigation.pop()}>
          <Icon name='arrow-back' style={{marginLeft:5, fontSize: 26, color: PRIMARY_FONT_COLOR}}/>
        </Button>
      </Left>
      <Body>
        <Title style={styles.primaryTextColor}>About</Title>
      </Body>
      <Right/>
    </Header>

    <Content style={{margin: 15}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.primaryTextColor}>Version</Text>
        <Text style={styles.primaryTextColor}>1.0.0</Text>
      </View>
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <TouchableOpacity style={{marginVertical: 15}}>
          <Text style={styles.primaryTextColor}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical: 15}}>
          <Text style={styles.primaryTextColor}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
)

const styles = StyleSheet.create({
  primaryTextColor: {
    color: PRIMARY_FONT_COLOR
  }
})
