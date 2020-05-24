import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'native-base';
import { PRIMARY_FONT_COLOR } from '../constants/Colors';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/media';

class MediaList extends Component {
  onMediaSelected = (item) => {
    this.props.updateMedia({ ...this.props.media, currentlyPlaying: item });
  };

  render() {
    const {
      media: { mediaList },
      setFlip,
    } = this.props;
    return (
      <View>
        <ScrollView contentContainerStyle={{ paddingBottom: 270 }}>
          <List>
            {mediaList.map((item) => (
              <ListItem key={item.title}>
                <TouchableOpacity
                  style={styles.panelItem}
                  onPress={() => {
                    this.onMediaSelected(item);
                    setFlip(false);
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <Text numberOfLines={1} style={styles.bookTitle}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookTitle: {
    color: PRIMARY_FONT_COLOR,
  },
  panelItem: {
    marginHorizontal: -15,
    paddingVertical: 8,
    flex: 1,
  },
});

function mapStateToProps({ media }) {
  return { media };
}

export default connect(mapStateToProps, { updateMedia })(MediaList);
