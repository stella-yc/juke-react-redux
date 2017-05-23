import React, { Component } from 'react';
import AUDIO from '../audio';
import store from '../store';
import { previous, next, setProgress, toggleSong } from '../action-creators/player';
import Player from '../components/Player';
import { connect } from 'react-redux';

const mapStateToProps = function (state) {
  return {
    currentSong: state.player.currentSong,
    currentSongList: state.player.currentSongList,
    isPlaying: state.player.isPlaying,
    progress: state.player.progress,
    player: state.player,
    selectedPlaylist: state.playlists.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    next() {
      dispatch(next());
    },

    prev() {
      dispatch(previous());
    },

    toggle(song, list) {
      dispatch(
        toggleSong(song, list)
      );
    }

  };
};

///****** COMPONENT TO RENDER **********/
class PlayerContainer extends Component {

  componentDidMount() {
    AUDIO.addEventListener('ended', this.next);
    AUDIO.addEventListener('timeupdate', () => {
      store.dispatch(setProgress(AUDIO.currentTime / AUDIO.duration));
    });
  }

  render() {
    console.log('PROPS', this.props);
    return <Player
      {...this.props}
    />;
  }

}
////******** COMPONENT ENDS ***********/


export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
