import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { H1, Container, Header, Body, Title, Content, Left, Right, Button, Icon, Fab, List, ListItem } from 'native-base';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, PRIMARY_COLOR, FADE_COLOR } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/media';

class MediaList extends Component{

  onMediaSelected = item => {
    this.props.updateMedia({...this.props.media, currentlyPlaying: item});
  }

  render(){
    const { media: { mediaList }, setFlip } = this.props;
    return (
      <View >
        <ScrollView contentContainerStyle={{paddingBottom: 270}}>

          <List>
          {

            mediaList.map(item => (
              <ListItem key={item.title}>
                <TouchableOpacity
                  style={styles.panelItem}
                  onPress={() => {
                    this.onMediaSelected(item);
                    setFlip(false);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text numberOfLines={1} style={styles.bookTitle}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ListItem>
            ))

          }
          </List>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bookTitle: {
    color: PRIMARY_FONT_COLOR,
  },
  panelItem: {
    marginHorizontal: -15,
    paddingVertical: 8
  }
});

function mapStateToProps({media}){
  return { media }
}

export default connect(mapStateToProps, {updateMedia})(MediaList);
