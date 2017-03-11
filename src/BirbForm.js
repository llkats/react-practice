import React, { Component } from 'react'
import birbs from '../data/birbs.json'

const isProd = true

class BirbForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchBirbs = this.fetchBirbs.bind(this)
  }

  fetchBirbs(url) {
    fetch(url)
    .then((response) => {
      console.log(response)
      if (response.status !== 200) {
        console.log(`error: ${response.status}`)
        return
      }

      response.json().then((data) => {
        if (data.length < 1) {
          this.props.getBirbs([{error: 'No birbs found for that location, sorry!'}])
        } else {
          this.props.getBirbs(data)
        }
      })
    })
  }

  fetchLatLon(e) {
    var loc = `https://maps.googleapis.com/maps/api/geocode/json?&address=${e}`

    fetch(loc)
    .then((response) => {
      if (response.status !== 200) {
        console.log(`error: ${response.status}`)
        return
      }

      response.json().then((data) => {
        if (data.results.length < 1) {
          this.props.getBirbs([{error: 'That location doesn\'t exist, sorry!'}])
          return
        }
        const loc = data.results[0].geometry.location
        const url = `http://ebird.org/ws1.1/data/obs/geo/recent?lng=${loc.lng}&lat=${loc.lat}&dist=2&back=5&maxResults=500&locale=en_US&fmt=json`
        this.fetchBirbs(url)
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const val = this.locationInput.value

    console.log(e, 'val')

    if (isProd) {
      if (val && val.length > 0) {
        this.fetchLatLon(val)
      } else {
        this.props.getBirbs([{error: 'No birbs found for that location, sorry!'}])
      }
    } else {
      this.props.getBirbs(birbs)
    }
  }

  handleChange(e) {
    // could track changes here as autocompletes for some sort of location search api
    this.props.handleLocationChange(e.target.value)
  }

  componentDidMount() {
    this.locationInput.focus()
  }

  render() {
    const location = this.props.location
    return (
      <form className="birbs-intro" onSubmit={this.handleSubmit}>
        <input type="text" className="get-birbs" placeholder="location" ref={(input) => { this.locationInput = input }} value={location} onChange={this.handleChange} />
        <button type="submit">get birbs</button>
      </form>
    );
  }
}

export default BirbForm
