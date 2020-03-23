import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, H1, Right, Icon, Button, Item, Input} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR} from '../constants/Colors';

const DATA = [
  {
    title: 'Drama',
    source: require('../../assets/genre/theater.png')
  },
  {
    title: 'Romance',
    source: require('../../assets/genre/heart.png')
  },
  {
    title: 'Fiction',
    source: require('../../assets/genre/brain.png')
  },
  {
    title: 'Biography',
    source: require('../../assets/genre/biography.png')
  },
  {
    title: 'Fantasy',
    source: require('../../assets/genre/unicorn.png')
  },
  {
    title: 'Horror',
    source: require('../../assets/genre/skull.png')
  },
]

const { width } = layout.window;

const SearchScreen = ({navigation}) => {
  return (
    <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
      <Header transparent iosBarStyle={"light-content"}>

      </Header>
      <Content showsVerticalScrollIndicator={false} style={styles.content}>

        <H1 style={styles.searchText}>Search</H1>

        <Item regular style={{borderRadius: 8,
          backgroundColor:'#eee',
          marginBottom: 12,
          marginTop: 12,
          height: 38}}>
          <Icon active name='search' />
          <Input placeholder='Search...'/>
        </Item>

        {

          <View style={{flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 15,
          flex: 1}}>
            {
              DATA.map(c => (
                <TouchableOpacity transparent
                  key={c.title}
                  style={styles.category}>
                  <Image source={c.source}
                  style={{height: 34, width: '100%', marginBottom: 4}}
                  resizeMode={'contain'}
                  />
                  <Text style={styles.boxText}>{c.title}</Text>
                </TouchableOpacity>
              ))
            }

          </View>

        }
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  searchText:{
    fontWeight: 'bold',
    color: PRIMARY_FONT_COLOR
  },
  content:{
    marginLeft: 15,
    marginRight: 15
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  category: {
    backgroundColor: '#1b1b1b',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    height: 100,
    justifyContent: 'center',
    margin: 4,
    width: width/2-23
  }
});

export default SearchScreen;
