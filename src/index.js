import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import AppRouter from './router'
import { Provider } from 'react-redux'
import store from './reducer/reducer'
import './common/axiosConfig'
import './index.less'
import Footer from './components/Footer'
import { getCookie, getLocalStorage } from '@/common/auth'
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      FooterShowType: true,
      FooterChoseType: location.hash.slice(1) || '/'
    }
  }

  componentDidMount() {
    document.getElementById('app').style.display = 'block'
    document.getElementById('loading-spinner').style.display = 'none'
    let req = location.hash.slice(1).split('?')[0] || '/';
    this.setState({
      FooterShowType: ['/home', '/winner', '/result', '/me'].includes(req) || getLocalStorage('accessToken') && req == '/'
    })
    const refresh = () => {
      let req = location.hash.slice(1) || '/';
      req = req.split('?')[0]
      this.setState({
        FooterShowType: ['/home', '/winner', '/result', '/me'].includes(req) || getLocalStorage('accessToken') && req == '/'
      })
      if (['/home', '/winner', '/result', '/me'].includes(req)) {
        this.setState({
          FooterChoseType: req
        })
      } else if (getLocalStorage('accessToken') && req == '/') {
        this.setState({
          FooterChoseType: '/'
        })
      }
    }
    window.addEventListener('hashchange', refresh.bind(this), false)
  }

  render() {
    const { FooterShowType, FooterChoseType } = this.state
    console.log(FooterChoseType, 'FooterShowType====')
    return (
      <Provider store={store}>
        <div>
          <HashRouter>
            <LocaleProvider locale={enUS}>
              <AppRouter />
            </LocaleProvider>
          </HashRouter>
        </div>
      </Provider>
    )
  }
}
ReactDom.render(<App />, document.getElementById("app"))
