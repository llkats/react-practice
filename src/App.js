import React, { Component } from 'react';
import BirbForm from './BirbForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { location: '', birds: [] }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ location: e })
  }

  render() {
    const loc = this.state.location ? this.state.location : ''

    return (
      <div className="birbs">
        <div className="birbs-header">
          <h2>Birbs</h2>
        </div>
        <BirbForm onChange={this.handleChange} location={loc} />
        <hr/>
        <div className="birbs-results">
          <h2>Results for {loc}</h2>
        </div>
      </div>
    );
  }
}

export default App;
