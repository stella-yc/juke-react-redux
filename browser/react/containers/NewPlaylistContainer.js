import React from 'react';
import NewPlaylist from '../components/NewPlaylist';
import store from '../store';
import {addNewPlaylist} from '../action-creators/playlists';
import { connect } from 'react-redux';




const mapStateToProps = function (state) {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitToStore: (inputVal) => {
      dispatch(addNewPlaylist(inputVal));
    }
  };
};



class NewPlaylistContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      dirty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value,
      dirty: true
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.submitToStore(this.state.inputValue);
  }

  // handleSubmit(evt) {
  //   evt.preventDefault();
  //   store.dispatch(addNewPlaylist(this.state.inputValue));
  // }

  render() {

    const dirty = this.state.dirty;
    const inputValue = this.state.inputValue;
    let warning = '';

    if (!inputValue && dirty) warning = 'You must enter a name';
    else if (inputValue.length > 16) warning = 'Name must be less than 16 characters';

    return (
      <NewPlaylist
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        inputValue={inputValue}
        warning={warning}
      />
    );
  }
}

// export default NewPlaylistContainer;

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylistContainer);
