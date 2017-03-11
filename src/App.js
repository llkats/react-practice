import React, { Component } from 'react';
import BirbForm from './BirbForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { location: '', birbs: [] }

    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.getBirbs = this.getBirbs.bind(this)
  }

  handleLocationChange(e) {
    console.log(e)
    this.setState({ location: e })
  }

  getBirbs(e) {
    console.log('birbs', e)
    this.setState({ birbs: e })
  }

  render() {
    const loc = this.state.location ? this.state.location : ''
    const birbs = this.state.birbs

    let count = 0
    let birbsElements

    if (birbs.length > 0) {
      birbsElements = birbs.map((birb) => {
        count++
        if (birb.error) {
          return <li key={count}>{ birb.error }</li>
        }
        return <li key={ count }>{ `${birb.howMany} ${birb.comName}s at ${birb.locName}` }</li>
      })
    }

    return (
      <div className="birbs">
        <div className="birbs-header">
          <h2>Birbs</h2>
        </div>
        <BirbForm handleLocationChange={this.handleLocationChange} getBirbs={this.getBirbs} location={loc} />
        <hr/>
        <div className="birbs-results">
          <h2>Results for {loc}</h2>
          <ul>{ birbsElements }</ul>
        </div>
      </div>
    );
  }
}

export default App;
