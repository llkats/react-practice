import React, { Component } from 'react';

class BirbForm extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  handleSubmit(e) {

    console.log(e)
    e.preventDefault()

    this.props.onChange(e.target.value)
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
