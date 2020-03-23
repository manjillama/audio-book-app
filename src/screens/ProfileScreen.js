import React, { Component } from 'react';
import { H3, Container, Header, Title, Content, Button, ListItem, Text, Icon, Left, Body } from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR } from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class ProfileScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
      <Header transparent iosBarStyle={"light-content"} style={{backgroundColor: '#191919', borderBottomWidth: 0}}>
        <Body>
          <Title style={{color: PRIMARY_FONT_COLOR}}>
            Profile
          </Title>
        </Body>
      </Header>

        <Content>
          <View style={{alignItems: 'center', paddingBottom: 15}}>
            <View style={{width: 100, height: 100, backgroundColor: '#000', padding: 22, borderRadius: 100/2, marginTop: 30, marginBottom: 15}}>
                <Image
                  source={require('../../assets/maidan.png')}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  resizeMode="contain"
                />
            </View>
           <H3 style={{fontWeight: 'bold', color: PRIMARY_FONT_COLOR}}>Manjil Tamang</H3>
         </View>

         <View style={{marginTop: 15}}>

          <Button transparent style={styles.item}>
            <View style={styles.itemLeft}>
              <View>
                <MaterialCommunityIcons style={styles.itemLeftIcon} size={22} active name="account-card-details" />
              </View>
              <View>
                <Text style={styles.listText}>My Details</Text>
              </View>
            </View>
            <View>
              <Icon active name="arrow-forward" style={styles.itemRightIcon}/>
            </View>
          </Button>

          <Button transparent style={styles.item}>
            <View style={styles.itemLeft}>
              <View>
                <MaterialCommunityIcons style={styles.itemLeftIcon} size={22} active name="lock-outline" />
              </View>
              <View>
                <Text style={styles.listText}>Change Password</Text>
              </View>
            </View>
            <View>
              <Icon active name="arrow-forward" style={styles.itemRightIcon}/>
            </View>
          </Button>

          <Button transparent onPress={() => navigation.navigate('About')} style={styles.item}>
            <View style={styles.itemLeft}>
              <View>
                <MaterialCommunityIcons style={styles.itemLeftIcon} size={22} active name="information-outline" />
              </View>
              <View>
                <Text style={styles.listText}>About</Text>
              </View>
            </View>
            <View>
              <Icon active name="arrow-forward" style={styles.itemRightIcon}/>
            </View>
          </Button>

        </View>

        <View style={{alignItems: 'center', marginBottom: 15}}>
          <Button light style={{width: 150}} rounded onPress={() => this.props.navigation.navigate('loginFlow')}>
            <Text style={{textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: 12}}>LOG OUT</Text>
          </Button>
        </View>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listText: {
    color: PRIMARY_FONT_COLOR
  },
  item: {
    padding:8,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemLeftIcon: {
    color: PRIMARY_FONT_COLOR,
  },
  itemRightIcon: {
    color: PRIMARY_FONT_COLOR, fontSize: 24
  }
});
