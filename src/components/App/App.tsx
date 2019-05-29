import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Storage from '../../storage/storage';

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  //* Ejecutará el métdo asíncrono, ya que se usa Fetch
  componentDidMount() {
    Storage.csvGetDataAsync();
    setTimeout(() => {
      Storage.csvGetPopulation();
      Storage.csvFest(Storage.csvPopulation);
      Storage.cosineSingularityGeneral(1);
    }, 2000);
  }

  render() {
    return (
      <Router>
        <div className="app">
        <Dashboard />
        </div>
      </Router>
    );
  }
}

export default observer(App);
