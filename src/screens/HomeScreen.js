import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Footer, H1, Left, Right, Body, Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import layout from '../constants/Layout';
import { SimpleLineIcons } from '@expo/vector-icons';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, PRIMARY_COLOR , FADE_COLOR} from '../constants/Colors';
import { connect } from 'react-redux';
const { width, height } = layout.window;
const DATA = require('../api/results.json');

class HomeScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      audioBooks: DATA
    };
  }

  render(){
    const { audioBooks } = this.state;
    return (
    <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
      <Header transparent style={{backgroundColor: '#191919', borderBottomWidth: 0}} iosBarStyle={"light-content"}>
        <Body style={{marginLeft: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../../assets/logo.png')} resizeMode="contain" style={{height: 150, width: 150}}/>
        </Body>

        <Right/>
      </Header>
      <Content style={{paddingTop: 30}}>
        <Grid>
          <Row>
            <Col style={styles.listPanel}>
              <View>
                <View style={styles.panelHeader}>
                  <H1 style={styles.panelTitle}>For you</H1>
                </View>
                <View style={{flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 15,
                flex: 1}}>
                  {
                    audioBooks.map(book => (
                      <TouchableOpacity style={{marginBottom: 15}} key={book.Identifier} onPress={() => this.props.navigation.navigate('BookView', book)}>
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
              </View>
            </Col>
          </Row>

        </Grid>
      </Content>


    </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon:{
    color: '#FFF'
  },
  listPanel: {
    marginBottom: 30
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },
  panelTitle: {
    fontWeight: 'bold',
    color: '#FFF'
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
    borderRadius: 6
  },
  panelImageRounded: {
    height:width/2.7,
    width: width/2.7,
    marginLeft: 15,
    borderRadius: (width/2.7)/2
  }
});

function mapStateToProps({mediaList}){
  return { mediaList };
}

export default connect(mapStateToProps, null)(HomeScreen);
