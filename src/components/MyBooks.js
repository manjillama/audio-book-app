import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { H1, Content, Button, Text} from 'native-base';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, FADE_COLOR } from '../constants/Colors';
import { DATA } from '../constants/data';

export default class MyBooksScreen extends Component {
  render() {
    return (

        <Content showsVerticalScrollIndicator = {false} style={{}}>

          {
            DATA.reverse().map(book => (
              <View style={styles.panel} key={book.title}>
                <Image
                  resizeMode={'cover'}
                  style={styles.bookCover}
                  source={{uri: book.cover}} />
                <View style={{flexShrink: 1}}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.authorName}>{book.author}</Text>
                  <Text style={{color: FADE_COLOR, fontSize: 12}} numberOfLines={6}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Text>
                </View>
              </View>
            ))
          }

        </Content>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row', padding: 15,
    backgroundColor: '#1b1b1b',
    marginBottom: 15,
  },
  bookCover: {
    width: 100,
    height: 150,
    marginRight: 15,
    borderRadius: 6
  },
  bookTitle: {
    fontWeight: 'bold',
    color: PRIMARY_FONT_COLOR
  },
  authorName: {
    marginBottom: 10,
    color: PRIMARY_FONT_COLOR
  }
});
