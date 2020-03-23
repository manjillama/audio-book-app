import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet'
import MediaPlayScreen from './MediaPlayScreen';
import layout from '../constants/Layout';
import { Audio } from 'expo-av';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { updateMedia } from '../actions/media';
import { toggleBottomTabs } from '../actions/showBottomTabs';
import { PRIMARY_FONT_COLOR  } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
const { height } = layout.window;
class MediaBottomSheet extends React.Component{

  constructor(props) {
    super(props);
    this.audio = null;
    this.state = {
      isLoaded: false,
      isLoading: false,
      isPlaying: false,
      audioDuration: 0,
      audioPosition: 0,
      isBuffering: true,
      audioSrc: this.props.media.currentlyPlaying.source
    };
    this._onPlaybackStatusUpdate = this._onPlaybackStatusUpdate.bind(this);

    this.bottomSheetRef = React.createRef();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { media } = this.props;
    if (prevProps.media !== media) {
      const { source } = media.currentlyPlaying;

      await this.audio.unloadAsync();
      await this.audio.loadAsync({uri: source});
      this.audio.playAsync();
    }
  }

  async componentDidMount(){
    this.audio = new Audio.Sound();
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    })

    this.audio.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

    await this.audio.loadAsync({uri: this.state.audioSrc});
    this.audio.playAsync();
  }

  componentWillUnmount(){
    this.audio.unloadAsync();
  }

  _onPlaybackStatusUpdate({isPlaying, isBuffering, positionMillis, durationMillis, isLoaded, didJustFinish}){
    if(didJustFinish)
      return this.playNext();

    this.setState({
      isLoaded,
      isPlaying,
      isBuffering,
      audioPosition: positionMillis || 0,
      audioDuration: durationMillis || 1
    })
  }

  _getSeekSliderPosition = () => {
    if (
      this.audio != null &&
      this.state.audioPosition != null &&
      this.state.audioDuration != null
    ) {
      return this.state.audioPosition / this.state.audioDuration;
    }
    return 0;
  }

  _onSeekSliderSlidingComplete = (value) => {
    if (this.audio != null) {
      const seekPosition = value * this.state.audioDuration;
      this.audio.playFromPositionAsync(seekPosition);
    }
  };

  onPlayPausePressed = async () => {
    if(this.audio != null){
      if (this.state.isPlaying) {
        this.audio.pauseAsync();
      } else {
        this.audio.playAsync();
      }
    }
  };

  playNext = async () => {
    const { media, updateMedia } = this.props;
    const { mediaList, currentlyPlaying } = media;
    const { title } = currentlyPlaying;

    const index = mediaList.findIndex(x => x.title === title);
    if(index + 1 < mediaList.length )
      updateMedia({...media, currentlyPlaying: mediaList[index+1]});
  }

  playPrevious = async () => {
    const { media, updateMedia } = this.props;
    const { mediaList, currentlyPlaying } = media;
    const { title } = currentlyPlaying;

    const index = mediaList.findIndex(x => x.title === title);
    if(index - 1 >= 0)
      updateMedia({...media, currentlyPlaying: mediaList[index-1]});

  }

  content = () => {
    const {isLoaded, isPlaying, isBuffering, audioDuration, audioPosition} = this.state;
    const {media} = this.props;
    return (
      <LinearGradient
      colors={['#0fa66f', '#3aa380', '#385e51', '#000000']}
      style={{
        height, paddingHorizontal: 15, borderRadius: 20,
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 0,
        },
        shadowOpacity: .2,
        shadowRadius: 4,
      }}
      >


          <MediaPlayScreen
            bottomSheetRef={this.bottomSheetRef}
            _getSeekSliderPosition = {this._getSeekSliderPosition}
            _onSeekSliderSlidingComplete = {this._onSeekSliderSlidingComplete}
            isLoaded = {isLoaded}
            isPlaying = {isPlaying}
            isBuffering = {isBuffering}
            audioDuration = {audioDuration}
            audioPosition = {audioPosition}
            media = {media}
            onPlayPausePressed = {this.onPlayPausePressed}
            playNext = {this.playNext}
            playPrevious = {this.playPrevious}
          />
      </LinearGradient>
    )
  }

  render(){
    const { isLoaded, isPlaying, isBuffering} = this.state;
    const { info } = this.props.media;

    return (
      <>
        <View style={{backgroundColor: '#2a2a2a', width: '100%', height: 56}}>
          <TouchableOpacity transparent
            onPress={() => this.bottomSheetRef.current.snapTo(0)} s
            tyle={{flex: 1}}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', height: '100%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Image
                  style={{
                    shadowOffset:{  width: 10,  height: 10},
                    shadowColor: 'black',
                    shadowOpacity: 1.0,
                    height: 56, width: 56, marginRight: 10}}
                  source={{uri: info.cover}}/>
                <Text style={{fontSize: 16, color: PRIMARY_FONT_COLOR, flex: 1}} numberOfLines={1}> {info.title} </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>

                { isBuffering && <Spinner />}

                <Button transparent
                  onPress = {this.onPlayPausePressed}
                  style={{justifyContent:'center', borderRadius:48/2, height: 48, width:48}} disabled={!isLoaded}>
                  <Ionicons style={[!isLoaded && {opacity: .3}, {color: PRIMARY_FONT_COLOR}]} size={36} name={isPlaying ? 'ios-pause' : 'ios-play'} />
                </Button>

              </View>
            </View>
          </TouchableOpacity>
        </View>
        <BottomSheet
          onOpenStart = {() => {
            this.props.toggleBottomTabs(false);
            StatusBar.setHidden(true);
          }}
          onCloseEnd = {() => {
            this.props.toggleBottomTabs(true)
            StatusBar.setHidden(false);
          }}
          ref={this.bottomSheetRef}
          snapPoints = {['100%', 0]}
          renderHeader = {this.content}
          initialSnap={1}
        />
      </>
    )
  }
}

function mapStateToProps({media}){
  return { media };
}

export default connect(mapStateToProps, {updateMedia, toggleBottomTabs}) (MediaBottomSheet);
