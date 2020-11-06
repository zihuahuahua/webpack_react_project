import React, { Component } from 'react'
import styles from './index.less'

class Alert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  // controller autoCloseType=>visible
  show(autoCloseType) {
    this.setState({ visible: true });
    if (!autoCloseType) return;
    setTimeout(() => this.hide(), 2000);
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    let { visible } = this.state;
    const { onClick, styleAlert } = this.props;
    return (
      <div
        onClick={onClick}
        className={visible ? `${styles.AlertView} ${styles.AlertShow}` : `${styles.AlertView} ${styles.AlertHide}`}
        style={styleAlert}
      >
        <div className={styles.AlertMask} onClick={() => this.hide()} />
        <div className={styles.AlertCont}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Alert