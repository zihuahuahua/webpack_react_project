import React from 'react'
import styles from './Footer.less'
import { createHashHistory } from 'history';
import { getLocalStorage } from '@/common/auth'

const hashHistory = createHashHistory();
const Home = require('./imgs/Home.png')
const HomeClick = require('./imgs/Home-Click.png')
const Me = require('./imgs/Me.png')
const MeClick = require('./imgs/Me-Click.png')
const Results = require('./imgs/Results.png')
const ResultsClick = require('./imgs/Results-Click.png')
const Winner = require('./imgs/Winner.png')
const WinnerClick = require('./imgs/Winner-Click.png')

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ChostType: props.ChostType,
      isIphonex: false,
      Tabbars: [{
        'name': 'Home',
        'path': !getLocalStorage('accessToken') ? '/home' : getLocalStorage('req') == '/login' ? '/home' : getLocalStorage('req') == '/' ? '/home' : '/',
        'imgType': true,
        'icon': <img className={styles.searchIcon} src={Home} />,
        'iconActive': <img className={styles.searchIcon} src={HomeClick} />
      }, {
        'name': 'Winner',
        'path': '/winner',
        'imgType': true,
        'icon': <img className={styles.searchIcon} src={Winner} />,
        'iconActive': <img className={styles.searchIcon} src={WinnerClick} />
      },
      {
        'name': 'Result',
        'path': '/result',
        'imgType': true,
        'icon': <img className={styles.searchIcon} src={Results} />,
        'iconActive': <img className={styles.searchIcon} src={ResultsClick} />
      },
      {
        'name': 'Me',
        'path': '/me',
        'imgType': true,
        'icon': <img className={styles.searchIcon} src={Me} />,
        'iconActive': <img className={styles.searchIcon} src={MeClick} />
      }]
    }
  }
  componentDidMount() {
    const isIphonex = () => /iphone/gi.test(navigator.userAgent) && window.screen && (window.screen.height === 812 && window.screen.width === 375);
    if (isIphonex()) {
      this.setState({
        isIphonex: true
      })
    }
  }

  HashHistroyGoto(path) {
    const { ChostType } = this.props
    if (path == ChostType) return false;
    this.setState({
      ChostType: path
    }, () => hashHistory.replace(path))
    document.body.scrollTop = 0
  }
  render() {
    const { Tabbars, isIphonex } = this.state
    var { ChostType } = this.props
    return (
      <div
        className={styles.container}
        style={{ paddingBottom: isIphonex ? '.34rem' : `` }}>
        {
          Tabbars && Tabbars.map(
            (item, ind) => (
              <div
                key={ind}
                className={`${styles.tabbar} ${ChostType == item.path ? styles.active : ''}`}
                onClick={() => {
                  setTimeout(() => {
                    this.HashHistroyGoto(item.path)
                  }, 10);
                }}>
                <div className={styles.imgBox}>{ChostType != item.path ? item.icon : item.iconActive}</div>
                <div className={styles.tab_name}>{item.name}</div>
              </div>
            )
          )
        }
      </div>
    )
  }
}
export default Footer
