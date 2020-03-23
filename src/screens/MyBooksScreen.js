import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, H1} from 'native-base';
import MyBooks from '../components/MyBooks.js';
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_FONT_COLOR, PRIMARY_COLOR, FADE_COLOR } from '../constants/Colors';

export default class MyBooksScreen extends Component {
  render() {
    return (
      <Container style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Header hasTabs transparent iosBarStyle={"light-content"} />

        <Tabs tabBarUnderlineStyle={{backgroundColor: PRIMARY_COLOR}}>
          <Tab
            tabStyle={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}
            style={{backgroundColor: PRIMARY_BACKGROUND_COLOR, borderBottomWidth: 0, borderColor: 'red'}}
            activeTabStyle={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}
            activeTextStyle={{color: PRIMARY_FONT_COLOR, fontSize: 22, fontWeight: 'bold'}}
            textStyle={{fontSize: 22, fontWeight: 'bold', color: FADE_COLOR}}
            heading="My Books">
            <MyBooks />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}
            style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}
            activeTabStyle={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}
            activeTextStyle={{color: PRIMARY_FONT_COLOR, fontSize: 22, fontWeight: 'bold'}}
            textStyle={{fontSize: 22, fontWeight: 'bold', color: FADE_COLOR}}
            heading="Downloads">
            <MyBooks />
          </Tab>
        </Tabs>

      </Container>
    );
  }
}
