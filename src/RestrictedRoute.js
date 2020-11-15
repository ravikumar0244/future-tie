import React from 'react';
import { auth, createDoc } from './firebase/config';
export default class RestrictedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  unsub = null;
  componentDidMount() {
    this.unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await createDoc(user);
        userDoc.onSnapshot((sn) => {
          this.setState({
            user: {
              id: sn.id,
              ...sn.data(),
            },
          });
        });
      }
      console.log(user);
    });
  }
  render() {
    return null;
  }
}
