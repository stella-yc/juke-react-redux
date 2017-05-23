import React, { Component } from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';

import { searchLyrics } from '../action-creators/lyrics';
import { connect } from 'react-redux';

const mapStateToProps = function (state) {
  return {
    lyrics: state.lyrics,
    player: state.player,
    artists: state.artists,
    albums: state.albums,
    playlists: state.playlists,
    songs: state.songs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitToStore: (artistQ, songQ) => {
      dispatch(searchLyrics(artistQ, songQ));
    }

  };
};

class LyricsContainer extends Component {

  constructor() {

    super();

    this.state = {
      artistQuery: '',
      songQuery: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);

  }


  handleArtistInput(artist) {
    this.setState({ artistQuery: artist });
  }

  handleSongInput(song) {
    this.setState({ songQuery: song });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {
      this.props.submitToStore(this.state.artistQuery, this.state.songQuery);
    }
  }


  render() {
    return (
      <Lyrics
        {...this.props}
        handleChange={this.handleChange}
        setArtist={this.handleArtistInput}
        setSong={this.handleSongInput}
        handleSubmit={this.handleSubmit} />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LyricsContainer);



// class LyricsContainer extends Component {

//   constructor() {

//     super();

//     this.state = Object.assign({
//       artistQuery: '',
//       songQuery: ''
//     }, store.getState());

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleArtistInput = this.handleArtistInput.bind(this);
//     this.handleSongInput = this.handleSongInput.bind(this);

//   }

//   componentDidMount() {
//     this.unsubscribe = store.subscribe(() => {
//       this.setState(store.getState());
//     });
//   }

//   handleArtistInput(artist) {
//     this.setState({ artistQuery: artist });
//   }

//   handleSongInput(song) {
//     this.setState({ songQuery: song });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     if (this.state.artistQuery && this.state.songQuery) {
//       store.dispatch(searchLyrics(this.state.artistQuery, this.state.songQuery));
//     }
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     return (
//       <Lyrics
//         {...this.state}
//         handleChange={this.handleChange}
//         setArtist={this.handleArtistInput}
//         setSong={this.handleSongInput}
//         handleSubmit={this.handleSubmit} />
//     );
//   }

// }

// export default LyricsContainer;

