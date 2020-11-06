import React, { Component } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { getLocalStorage, setLocalStorage, setCookie } from '@/common/auth'
import { GetRequest } from '@/utils'
import {
  NoFound,
  Home,
  mailbox
} from './router'

class AppRouter extends Component {

  constructor(props) {
    super(props)
    console.log(this.props)
    // const { location: { pathname } } = this.props
    // console.log(pathname, 'pathname')
    this.state = {
      historyTitle: {
        '/': 'HOME',
        '/login': 'LOGIN',
        '/home': 'HOME',
        '/mailbox': 'mailbox',
      }
    }
    this.HandleHistoryChange()
    this.getUrlParams()
  }
  componentDidMount() {
  }
  getUrlParams() {
    let data = GetRequest(window.location.href)
    console.log(data, 'linkParamsData')
    if (!data) return
  }

  HandleHistoryChange() {
    const { historyTitle } = this.state
    document.title = historyTitle[this.props.location.pathname] || ''
    this.props.history.listen((location) => {
      document.title = historyTitle[location.pathname] || ''
    })
  }
  render() {

    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/mailbox" component={mailbox} />
          <Route component={NoFound} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(AppRouter);
