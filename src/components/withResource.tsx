import React from 'react';
import firebase from '../firebase';
import { TResource } from '../types';

interface WithDataProps<T> {
  data: TResource;
}

// This function takes a component...
function withResource<
  TData,
  TProps extends WithDataProps<TData>,
  TWrappedComponentProps
>(
  WrappedComponent: React.JSXElementConstructor<
    TProps & TWrappedComponentProps
  >,
  dataPath: string
) {
  type Props = JSX.LibraryManagedAttributes<
    TWrappedComponentProps,
    Exclude<TProps, 'data'>
  >;
  type State = {
    data: TData;
  };
  // ...and returns another component...
  return class extends React.Component<Props, State> {
    firebaseRef?: firebase.database.Reference;
    firebaseCallback?: (
      a: firebase.database.DataSnapshot | null,
      b?: string
    ) => any;

    constructor(props: Props) {
      super(props);
      this.state = { data: {} as TData };
    }

    componentDidMount(): void {
      // Updating the `someData` local state attribute when the Firebase Realtime Database data
      // under the '/someData' path changes.
      this.firebaseRef = firebase.database().ref(dataPath);
      this.firebaseCallback = this.firebaseRef.on('value', snap => {
        if (!snap) {
          throw new Error('No data was provided by the backend');
        }
        this.setState({ data: snap.val() });
      });
    }

    componentWillUnmount(): void {
      // Un-register the listener on '/someData'.
      const callback = this.firebaseCallback;
      callback &&
        this.firebaseRef &&
        this.firebaseRef.off('value', callback as (
          a: firebase.database.DataSnapshot,
          b?: string | null
        ) => any);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props as any} />;
    }
  };
}

export default withResource;
