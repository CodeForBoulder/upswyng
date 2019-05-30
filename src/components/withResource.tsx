import React from 'react';
import firebase from '../firebase';
import { TResource } from '../types';
import { blankResource } from '../DataMocks';

interface WithDataProps {
  resource: TResource;
}
/**
 * Used to automatically provide realtime updates of Resource records from Firebase to a component that needs a resource prop
 * ex:
 * interface TResourcePhotoDisplayProps {
 *   resource: TResource,
 *   height: number,
 *   width: number,
 * }
 * const Ex1ResourcePhotoDisplay = withResource(ResourcePhotoDisplay, '/path/to/ex/1');
 * ....
 * function ResourcePhotos() {
 *  return (
 *    <>
 *      {/*notice the component does not need to have a resource provided, since `withResource` will cause it to be fetched from Firebase and passed in\/*}
 *      <Ex1ResourcePhotoDisplay height={200} width={175} />
 *    </>
 * )
 * }
 */
function withResource<TWrappedComponentProps extends WithDataProps>(
  WrappedComponent: React.JSXElementConstructor<
    TWrappedComponentProps & WithDataProps
  >,
  dataPath: string
) {
  type State = WithDataProps;

  return class extends React.Component<TWrappedComponentProps, State> {
    firebaseRef?: firebase.database.Reference;
    firebaseCallback?: (
      a: firebase.database.DataSnapshot | null,
      b?: string
    ) => unknown;

    state = { resource: blankResource };

    componentDidMount(): void {
      // Updating the `someData` local state attribute when the Firebase Realtime Database data
      // under the '/someData' path changes.
      this.firebaseRef = firebase.database().ref(dataPath);
      this.firebaseCallback = this.firebaseRef.on('value', snap => {
        if (!snap) {
          throw new Error('No data was provided by the backend');
        }

        this.setState({ resource: snap.val() });
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
        ) => unknown);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent resource={this.state.resource} {...this.props} />
      );
    }
  };
}

export default withResource;
