import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, H1, Right, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import layout from '../constants/Layout';
import {
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_FONT_COLOR,
  FADE_COLOR,
} from '../constants/Colors';
import { connect } from 'react-redux';
const { width } = layout.window;
const DATA = require('../api/results.json');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioBooks: [],
      scroll: 1,
      listSize: 14,
      message: null,
    };
  }

  componentDidMount() {
    const { scroll, listSize } = this.state;
    this.setState({
      audioBooks: DATA.slice(0, scroll * listSize),
      scroll: scroll + 1,
    });
  }

  /*
   * True if user has scrolled to bottom on the screen
   */
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  onScrollToEnd = () => {
    const { scroll, listSize, audioBooks } = this.state;
    const newList = [...DATA.slice(audioBooks.length, scroll * listSize)];
    if (newList.length > 0) {
      this.setState({
        audioBooks: [...audioBooks, ...newList],
        scroll: scroll + 1,
      });
    } else {
      this.setState({
        message: 'Reached the end on list :(',
      });
    }
  };

  render() {
    const { audioBooks, message } = this.state;
    return (
      <Container style={{ backgroundColor: PRIMARY_BACKGROUND_COLOR }}>
        <Header
          transparent
          style={{ backgroundColor: '#191919', borderBottomWidth: 0 }}
          iosBarStyle={'light-content'}
        >
          <Body
            style={{
              marginLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <H1 style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}>
              Welcome
            </H1>
          </Body>

          <Right />
        </Header>
        <Content
          style={{ paddingTop: 30 }}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.onScrollToEnd();
            }
          }}
        >
          <Grid>
            <Row>
              <Col style={styles.listPanel}>
                <View>
                  <View style={styles.panelHeader}>
                    <H1 style={styles.panelTitle}>For you</H1>
                    <Text
                      style={{ color: PRIMARY_FONT_COLOR, fontWeight: 'bold' }}
                    >
                      {DATA.length} books in total
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginBottom: 15,
                      flex: 1,
                    }}
                  >
                    {audioBooks.map((book) => (
                      <TouchableOpacity
                        style={{ marginBottom: 25 }}
                        key={book.Identifier}
                        onPress={() =>
                          this.props.navigation.navigate('BookView', book)
                        }
                      >
                        <Image
                          source={{ uri: book.cover }}
                          style={styles.panelImage}
                        />
                        <Text numberOfLines={1} style={styles.bookTitle}>
                          {book.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: FADE_COLOR,
                            marginLeft: 15,
                            width: width / 2.7,
                          }}
                        >
                          {book.author}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {message && (
                    <Text
                      style={{
                        color: PRIMARY_FONT_COLOR,
                        padding: 15,
                        backgroundColor: '#191919',
                        textAlign: 'center',
                      }}
                    >
                      {message}
                    </Text>
                  )}
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
  headerIcon: {
    color: '#FFF',
  },
  listPanel: {
    marginBottom: 30,
  },
  panelHeader: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginRight: 15,
    // alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },
  panelTitle: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  bookTitle: {
    marginLeft: 15,
    marginTop: 6,
    width: width / 2.7,
    color: '#FFF',
  },
  panelImage: {
    width: width / 2 - 23,
    height: width / 2 - 23,
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: '#191919',
  },
  panelImageRounded: {
    height: width / 2.7,
    width: width / 2.7,
    marginLeft: 15,
    borderRadius: width / 2.7 / 2,
  },
});

function mapStateToProps({ mediaList }) {
  return { mediaList };
}

export default connect(mapStateToProps, null)(HomeScreen);
