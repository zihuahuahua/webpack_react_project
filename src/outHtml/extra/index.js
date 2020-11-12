import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    document.getElementById('app').style.display = 'block'
    document.getElementById('loading-spinner').style.display = 'none'
  }

  render() {
    return (
      <div>extra page</div>
    )
  }
}
ReactDom.render(<App />, document.getElementById("app"))
