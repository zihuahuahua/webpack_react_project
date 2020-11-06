import React from 'react'
import styles from './Header.less'
import backPng from './img/back.png'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  render() {
    const { style = {}, styleTitle = {}, title, showTitle = true, src, video, backStyle, showBack = true } = this.props
    return (
      <div className={styles.Htitle} style={{ ...style }}>
        {showBack && <div className={styles.HWrap} onClick={() => {
          if (window.Android) {
            window.Android.jsBack()  // 
          } else {
            history.back()
          }
        }}>
          <img
            src={src || backPng}
            style={backStyle}
            alt=""
            className={styles.backLogo} />
        </div>}
        {
          showTitle ? <div className={styles.title} style={{ ...styleTitle }} >{title}</div> : ''
        }
        {this.props.children}
      </div>
    )
  }
}
export default Header