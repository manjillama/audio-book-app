import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Footer, H1, Right, Icon, Button, Item, Input} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, FADE_COLOR } from '../constants/Colors';
const { width } = layout.window;
const DATA = require('../api/results.json');

const SearchScreen = ({navigation}) => {
  const [audioBooks, setAudioBooks] = useState([]);
  const [term, setTerm] = useState('');

  function onSearch(text){
    setTerm(text);
  }

  useEffect(() => {



    if(term && term.length >= 3){
      if(this.timeout)
        clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        const books = DATA.filter(book => book.title.toLowerCase().includes(term.toLowerCase().trim()));
        setAudioBooks(books);
      }, 300);
    }


  }, [term])

  return (
    <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
      <Header transparent iosBarStyle={"light-content"}>

      </Header>
      <Content showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          <H1 style={styles.searchText}>Search</H1>

          <Item regular style={{borderRadius: 8,
            backgroundColor:'#eee',
            marginBottom: 12,
            marginTop: 12,
            height: 38}}>
            <Icon active name='search' />
            <Input placeholder='Search...' onChangeText={onSearch}/>
          </Item>
        </View>

        {

          <View style={{flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 15,
          flex: 1}}>
          {
            audioBooks.map(book => (
              <TouchableOpacity style={{marginBottom: 25}} key={book.Identifier} onPress={() => navigation.navigate('BookView', book)}>
                <Image
                    source={{uri: book.cover}}
                    style={styles.panelImage}
                  />
                <Text numberOfLines={1} style={styles.bookTitle}>{book.title}</Text>
                <Text numberOfLines={1} style={{color: FADE_COLOR, marginLeft: 15, width: width/2.7}}>{book.author}</Text>
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
  bookTitle: {
    marginLeft: 15,
    marginTop: 6,
    width: width/2.7,
    color: '#FFF'
  },
  panelImage: {
    width: width/2-23,
    height: width/2-23,
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: '#191919'
  },
});

export default SearchScreen;
