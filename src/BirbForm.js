import React, { Component } from 'react';

const url = 'http://ebird.org/ws1.1/data/obs/geo/recent?lng=-122.271114&lat=37.804364&dist=2&back=5&maxResults=500&locale=en_US&fmt=json'

class BirbForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log(`error: ${response.status}`)
        return
      }

      response.json().then((data) => {
        this.props.getBirbs(data)
      })
    })
  }

  handleChange(e) {
    console.log('hi change', this.props)
    // could track changes here as autocompletes for some sort of location search api
    this.props.handleLocationChange(e.target.value)
  }

  render() {
    const location = this.props.location
    return (
      <form className="birbs-intro" onSubmit={this.handleSubmit}>
        <input type="text" className="get-birbs" placeholder="location" value={location} onChange={this.handleChange} />
        <button type="submit">get birbs</button>
      </form>
    );
  }
}

export default BirbForm;
