import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import Storage from '../../storage/storage';

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  //* Ejecutará el métdo asíncrono, ya que se usa Fetch
  componentDidMount() {
    Storage.csvGetDataAsync();
    setTimeout(() => {
      Storage.cosineSingularityGeneral(15);
    }, 2000);
  }

  render() {
    return (
      <div>
        <h1>{}</h1>
      </div>
    );
  }
}

export default observer(App);
