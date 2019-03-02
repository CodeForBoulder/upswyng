import React from 'react';
import firebase from '../firebase.js';

// This function takes a component...
function withData(WrappedComponent, dataPath) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {}
      };
    }

    componentDidMount() {
      // Updating the `someData` local state attribute when the Firebase Realtime Database data
      // under the '/someData' path changes.
      this.firebaseRef = firebase.database().ref(dataPath);
      this.firebaseCallback = this.firebaseRef.on('value', snap => {
        this.setState({ data: snap.val() });
      });
    }

    componentWillUnmount() {
      // Un-register the listener on '/someData'.
      this.firebaseRef.off('value', this.firebaseCallback);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default withData;
