import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { H1, Container, Header, Body, Title, Content, Left, Right, Button, Icon, Fab, List, ListItem } from 'native-base';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, PRIMARY_COLOR, FADE_COLOR } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { DATA } from '../constants/data';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/media';

class SeeAllListScreen extends Component{

  onMediaSelected = (item) => {
    this.props.updateMedia({mediaList: DATA, currentlyPlaying: item});
  }

  render(){
    const { header } = this.props.navigation.state.params;

    return (
      <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Header transparent iosBarStyle={"light-content"}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.pop()}>
              <Icon name='arrow-back' style={{color: PRIMARY_FONT_COLOR, marginLeft:5, fontSize: 26}}/>
              <Text style={{color: PRIMARY_FONT_COLOR}}> Browse</Text>
            </Button>
          </Left>
          <Body>
          </Body>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          <H1 style={{fontWeight: 'bold', marginLeft: 15, marginBottom: 10, color: PRIMARY_FONT_COLOR}}>{header}</H1>

          <View style={{
            borderRadius: 10,
            flex: 1,
            height: 150,
            overflow: 'hidden',
            marginHorizontal: 15
          }}>


            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../../assets/bg.jpg')}
              resizeMode={'cover'}
            />
            <Fab
              direction="up"
              style={{ backgroundColor: PRIMARY_COLOR}}
              position="bottomRight"
              onPress={() => this.onMediaSelected(DATA[0])}>
              <Icon name="play" style={{fontSize: 38, lineHeight: 38}}/>
            </Fab>
          </View>

          <List>
          {

            DATA.map(item => (
              <ListItem key={item.title} style={{borderColor: 'transparent'}}>
                <TouchableOpacity
                  style={styles.panelItem}
                  onPress={() => this.onMediaSelected(item)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: item.cover}}
                        style={styles.panelImage}
                      />
                    <View>
                      <Text numberOfLines={1} style={styles.bookTitle}>{item.title}</Text>
                      <Text numberOfLines={1} style={styles.authorFont}>{item.author}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('BookView', item)} transparent>
                    <Ionicons name="ios-information-circle-outline" style={{fontSize: 24, color: PRIMARY_FONT_COLOR}}/>
                  </TouchableOpacity>
                </TouchableOpacity>
              </ListItem>
            ))

          }
          </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  bookTitle: {
    color: PRIMARY_FONT_COLOR,
  },
  panelItem: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  panelImage: {
    height: 52,
    width: 52,
    marginRight: 15,
    borderRadius: 6
  },
  authorFont: {
    fontSize: 12,
    color: FADE_COLOR
  }
});

export default connect(null, {updateMedia})(SeeAllListScreen);
