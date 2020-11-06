import React from 'react'
import { createHashHistory } from 'history';
const hashHistory = createHashHistory();
import styles from './loading.less'
const DelayLoading = ({ pastDelay, error }) => {
  if (pastDelay) {
    return (
      <div id={styles.loading_spinner}>
        <div className={styles.spinner}></div>
      </div>
    )
  } else if (error) {
    console.log(error, 'page loading')
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = hashHistory.location.pathname;
    if (isChunkLoadFailed) {
      hashHistory.replace(targetPath);
    }
    return <div style={{ fontSize: '0.24rem' }}>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
}
export default DelayLoading