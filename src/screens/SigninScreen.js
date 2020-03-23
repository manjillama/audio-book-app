import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
import { PRIMARY_FONT_COLOR, PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR } from '../constants/Colors';

class SigninScreen extends Component {
  render() {
    return (
      <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Header transparent iosBarStyle={"light-content"}>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <View style={{
            marginBottom: 40,
            height: 100, width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'}}>
            <Image
              resizeMode={'contain'}
              style={{height: 100, width: 120}}
              source={require('../../assets/logo.png')}
              />
          </View>
          <Form style={styles.form}>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Email</Label>
              <Input style={styles.inputText}/>
            </Item>
            <Item stackedLabel style={styles.item}>
              <Label style={styles.label}>Password</Label>
              <Input style={styles.inputText}/>
            </Item>
            <Button style={styles.submitBtn} rounded onPress={() => this.props.navigation.navigate('mainFlow')}>
              <Text style={styles.submitBtnText}>LOGIN</Text>
            </Button>
            <View style={styles.createAccPanel}>
              <Text style={{color: PRIMARY_FONT_COLOR}}>Don't have an account already? </Text><Button transparent onPress={() => this.props.navigation.navigate('Signup')}><Text style={{color: PRIMARY_COLOR}}>Sign Up</Text></Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    paddingRight: 15
  },
  submitBtn: {
    margin: 15,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: PRIMARY_COLOR
  },
  submitBtnText: {
    width: '100%',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold'
  },
  createAccPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    borderColor: 'transparent'
  },
  label: {
    fontSize: 22, fontWeight: 'bold',
    marginBottom: 8,
    color: PRIMARY_FONT_COLOR
  },
  inputText: {
    color: '#FFF', backgroundColor: '#414141', borderRadius: 5,
    paddingLeft: 10
  }
});

export default SigninScreen;
