
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { PullToRefresh, Accordion, Toast } from 'antd-mobile'
import styles from './index.less'
import { queryNoticeList, modifyNoticeStateAlreadyRead } from '@/API/api'
import Header from '@/components/Header'
import { FormateTime_in } from '@/utils'

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      hasData: false
    }
    this.timer = null
  }
  componentDidMount() {
    this.getNoticeList()
  }
  refreshFunc = async () => {
    this.getNoticeList()
  }

  getNoticeList = () => {
    let obj = {
      ccontent: "content",
      ccreatedTime: 1601365206000,
      ctitle: "title",
      id: 23,
      ihour: 72,
      iread: 1,
      itype: 0,
    }
    let arr = []
    for (let i = 0; i < 2; i++) {
      arr.push(obj)
    }
    this.setState({
      noticeList: arr,
      hasData: true
    })
  }

  onChangeAcc = async (key) => {
    const { noticeList } = this.state
    // noticeList.length !== 0 && noticeList.forEach(async (item) => {
    //   if (item.id == key && item.iread == 0) {
    //     const { data, code, msg } = await modifyNoticeStateAlreadyRead({ id: key })
    //     if (code == 0) {
    //       this.getNoticeList()
    //     } else {
    //       Toast.info(msg, 2)
    //     }
    //   }
    // });

  }
  render() {
    const { noticeList, hasData } = this.state
    console.log(noticeList, 'list')
    return (
      <div className={styles.mailBox}>
        <Header
          title={'MAILBOX'}
          style={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            background: '#fff',
            zIndex: 999,
          }}
        />
        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: 'calc(100vh - 0.96rem)',
            overflow: 'auto',
          }}
          onRefresh={() => this.refreshFunc()}
        >
          <div className={styles.mailList}>
            {hasData && noticeList.length !== 0 && <Accordion className="my-accordion" onChange={this.onChangeAcc} accordion >
              {noticeList.length !== 0 && noticeList.map((i, v) => {
                let time = FormateTime_in(i.ccreatedTime).slice(0, 10) || ''
                console.log(i, 'i===')
                return (
                  <Accordion.Panel
                    header={<div className={styles.top}>
                      <div className={styles.left}>
                        <img src={i.iread == 0 ? require('@/assets/img/mail/unread.png') : require('@/assets/img/mail/read.png')} />
                        <p>{i.ctitle}</p>
                      </div>
                      <span>Expire in {i.ihour} {i.ihour > 1 ? 'days' : 'day'}</span>
                    </div>}
                    className={styles.listItem} key={i.id + Math.random()}
                  >
                    <div className={styles.mail}>
                      <div className={styles.title}>
                        <p>{i.ctitle}</p>
                        <span>{time}</span>
                      </div>
                      <div className={styles.content}>{i.ccontent}</div>
                    </div>
                  </Accordion.Panel>
                )
              })}
            </Accordion>}

            {hasData && noticeList.length == 0 && <div className={styles.empty}>
              <img src={require('@/assets/img/mail/empty_box.png')} />
              <p>You don't have any messages.</p>
            </div>}
          </div>
        </PullToRefresh>
      </div>
    )
  }
}
