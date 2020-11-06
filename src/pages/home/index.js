import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { } from '@/API/api'
import styles from './index.less'
import { Carousel, Toast, PullToRefresh } from 'antd-mobile'
import { setCookie, getCookie, setLocalStorage, getLocalStorage } from '@/common/auth'

import dingk from '@/assets/img/home/dingk.png'

const ava = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAA4VBMVEUbFRUaFxcwMDAaFRX///8iHh79/f0dGBhUUFDT0tK4t7cwKyuysbHNy8syLS34+PhoZWUrJiYfGhrw8PDu7e3Z2Nivrq6npaVxbm5jYGDe3d3DwsKamJh7eHhtampXU1NCPj76+vr39vbg39/b29vR0NDBv7+Cf39aVlZNSUklICDy8vLq6enk5OTi4eHa2dnHxsa1s7NfW1s0Ly/o6OjV1NS8u7utq6ukoqKem5uSj491cnJdWVlXVFRRTU1IREQ+OTk4NDQuKionIiL09PS2tLSVkpKPjY2Kh4eHhISpp6evBPJsAAAAA3RSTlPmhwVTsZLPAAADoklEQVRo3u3aaVMaMRzHcWx+e7EHN+U+CoigghTv+6hV+/5fUOsITeIsm38WatuZ/T5TGT4SkrAEUp+2UuwPl9r6lNpiH9BWKsU+IJqyfgmTMCyshEmYv8t0WuczZ1LMZIoT5/G80mFs48y4Ut7Du4pe5WGjzE75C0LLeJcbY7IOIiq1rE0w7SkU1S7XZlwPhNLz9ZhqAaS+Zddg8g2QOzXiMuM6NPJz8RjXgVb9eRzGrUGz/bk+M3agXT+ny+TriJFvaDINxOqzHlPl/+Cw4ZuIyBw0hgdY1tJhXL4qv77++HKIFe09B4wxm6/TOw3G41vw22gbQw5nMli2+/L2Z2sXy47pTBu/G7BF9ydmzxtedQLjFxp02sNyzZwFbBEfNVTJzFTYFPlv5Vkk/+IEv5tYRCYLXpmROgWvQmQcaYaSOgOvZpGYHQjVaUwaQlUSU4bQIY3pQ+iYwozlq4tbihJArHtPYCoQ244xaGgSGHnMcjTmoSeNGoGRrvouGLEshHYtJdOBUM9i1I4gNFIyLQg9M3JN6clRMucQuqEztxA6UzIz8ApMo8PV8zMVvdOUdBgfvJ6SmSh2GtLSKSqZInhpHeYEvK6SychDTO8RQnkVI+5ovg6zDSFLxeyDt6/DTKUpqmIG4Jl5MiIPQ03FyI/dpis3EPKVzAmEvtOZZwillUwDQg6dOYDQqZLJQuyOqrhd6fVDybgQ86jMZ/mVXcmwGsRGNKVjShfWTM2cQmxgUBTjQB4DAtOC1DZh7VhpaF9y5L5AKj1WPpYypMyAwLDPkNu/ilbsHuRmTMnw9Vw49peT9NGOQDwT77JJDPOXF/b3Z1hUerLzIaPVPi+FHElpvfEovL4drPKXn8yRJ83uUXraRVgXRMYq8R0tC55vSbeqI7SeQWTY9WK4X+QJcROxJHmXjMbw+zZtxoz+yn10gJA8RmdyRf5sBst7a7B3PYUou64Gw1rCqYDRPDJhlr7Pw28k14x1mHKwmLm5sC1nh3yYory6izpcvMb76pYuYzhvhyPXGkz/Icax3dul1Jfh6n0Gcnt3cQ4hA2dxNfQ0mueN251AwUzvYh6ppiH2NZqpP8Q9ILbOIpm2NMesNY67K8WIw4srYVU21zu8z/3gzOp147lrfxRhLze17Cpmov4oglC+4kQN2tGFwZQMrVG5i4IbssGaM5tt8kMvt30f8sS1X9fSf/pJYcIkTMIkTMJsivlXvqCW+qAv9X3QVxR/AveXsgHzlAQ9AAAAAElFTkSuQmCC'

export default class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false, //banner controllor
      flag2: false, //banner controllor
      LotteryBannerArr: [''], //defaulr img
      LotteryTsGidArr: [],
      colorArr: [
        {
          color: '#2D82EC',
          bg: 'linear-gradient(45deg, rgba(1, 130, 222, 0.2), rgba(0, 192, 250, 0.2))'
        },
        {
          color: '#6D65EB',
          bg: 'linear-gradient(225deg, rgba(206, 127, 173, 0.2), rgba(46, 102, 205, 0.2))'
        },
        {
          color: 'rgba(125, 73, 225, 1)',
          bg: 'linear-gradient(45deg, rgba(56, 19, 194, 0.2), rgba(255, 111, 216, 0.2))'
        },
        {
          color: 'rgba(236, 48, 44, 1)',
          bg: 'linear-gradient(45deg, rgba(255, 0, 2, 0.2), rgba(254, 73, 0, 0.2))'
        },
        {
          color: 'rgba(28, 156, 28, 1)',
          bg: 'linear-gradient(45deg, rgba(0, 118, 3, 0.2), rgba(79, 215, 73, 0.2))'
        },
      ],
      timeOn: [], // Display countdown
      scrollData: [],
      linkData: '',
      userinfo: {
        avaterUrl: ava,
      },
      accountData: {},
      winnerList: [1, 1, 1, 1, 1, 1, 1],
      hasNotice: false,

      height: document.documentElement.clientHeight,
    };
  }

  async componentDidMount() {
    this.GetHomePage()
  }

  refreshFunc = async () => {
    // pulldown refresh fuction
    this.GetHomePage()

  }

  componentDidUpdate() {
    if (this.state.flag) this.setState({ flag: false })
    if (this.state.flag2) this.setState({ flag2: false })
  }
  componentWillUnmount() {
    setLocalStorage('req', '');
  }

  GetHomePage = async () => {
    let arr = []
    let obj = {
      clickable: 0,
      contentTwo: "10503",
      detailPath: "",
      eventId: "",
      id: 7,
      imgUrl: "http://img-test.office.jeetobada.com/mainpage/luckyball_logo@2x.png",
      itemTitle: "Game",
    }
    for (let i = 0; i < 3; i++) {
      arr.push(obj)
    }
    this.setState({
      LotteryTsGidArr: arr,
      flag: true
    })

    if (arr_g.length <= colorArr.length) return
    while (arr_g.length > colorArr.length) {
      this.setState({ colorArr: colorArr.concat(colorArr) })
    }
  }

  navgatePage = (item, state) => {
    this.props.history.push({
      pathname: item.detailPath,
      state
    })
  }
  navigateTo = (path) => {
    this.props.history.push(path)
  }

  render() {
    const { LotteryBannerArr, LotteryTsGidArr, colorArr, flag, flag2, scrollData, download, linkData, userinfo, accountData, winnerList, hasNotice } = this.state

    return (
      <div className={styles.container}>
        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          onRefresh={() => this.refreshFunc()}
        >
          <div className={styles.home_container}>
            <div className={styles.userinfoBox}>
              <div className={styles.box} onClick={() => this.navigateTo('me')}>
                <div className={styles.avaDiv}>
                  <div className={styles.profileBox}>
                    <div className={styles.ava} style={{ background: `url(${userinfo.avaterUrl}) no-repeat center center /cover` }}></div>
                  </div>
                  <img src={require('@/assets/img/home/medal.png')} className={styles.model} />
                </div>
                <div className={styles.nameDiv}>
                  <p className={styles.username}>{userinfo.nickname || '--'}</p>
                  <p className={styles.uid}>ID: {userinfo.userId || '--'}</p>
                </div>
              </div>

              <div className={styles.rightBox}>
                <div className={styles.mailBox} onClick={() => this.navigateTo('mailBox')}>
                  <img src={hasNotice ? require('@/assets/img/home/unread.png') : require('@/assets/img/home/mail.png')} />
                </div>
                <div className={styles.pointWrap} onClick={() => this.navigateTo('addCash')}>
                  <div className={styles.pointDiv}>
                    <p className={styles.point}>${accountData.ibalancetotal && (accountData.ibalancetotal).toFixed(2) || '0.00'}</p>
                    <img src={require('@/assets/img/home/wallet.png')} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bannerDiv}>
              <div className={styles.banner_wrap}>
                {LotteryBannerArr.length > 1 &&
                  <Carousel
                    className={styles.my_carousel}
                    autoplay={!flag}
                    infinite
                    selectedIndex={0}
                    swipeSpeed={35}
                    dotStyle={{ position: 'relative', top: '-3px' }}
                    dotActiveStyle={{ position: 'relative', top: '-3px' }}
                  >
                    {LotteryBannerArr && LotteryBannerArr.map((val, index) => {
                      return (
                        <a key={index} onClick={val.clickable == 0 ? () => this.navgatePage(val) : () => { }}>
                          <img className={styles.carouselImg}
                            src={val.imgUrl}
                            // src={url}
                            style={{ 'maxWidth': '100%' }}
                            onLoad={() => {
                              window.dispatchEvent(new Event('resize'));
                            }}
                          />
                        </a>
                      )
                    })}
                  </Carousel>
                }
                {LotteryBannerArr.length == 1 && <a onClick={LotteryBannerArr[0].clickable == 0 ? () => this.navgatePage(LotteryBannerArr[0]) : () => { }}>
                  <img className={styles.carouselImg}
                    src={LotteryBannerArr[0].imgUrl}
                    style={{ 'maxWidth': '100%' }}
                    onLoad={() => {
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>}
              </div>
              {scrollData.length > 1 && <div style={{ height: '0.4rem' }}>
                <Carousel
                  autoplay={!flag2}
                  infinite
                  selectedIndex={0}
                  swipeSpeed={35}
                  vertical
                  dots={false}
                >
                  {scrollData.length !== 0 && scrollData.map((i, v) => {
                    return (
                      <div className={styles.tips_wrap} key={v + Math.random()}>
                        <img src={dingk} className={styles.tips_icon} />
                        <p className={styles.tips}>{i}</p>
                      </div>
                    )
                  })}
                </Carousel>
              </div>}
              {scrollData.length == 1 && <div style={{ height: '0.4rem' }}>
                <div className={styles.tips_wrap}>
                  <img src={dingk} className={styles.tips_icon} />
                  <p className={styles.tips}>{scrollData[0]}</p>
                </div>
              </div>}
            </div>
            {/*  */}
            <div className={styles.lottery_gid_wrap}>
              <div className={styles.wrap}>
                {LotteryTsGidArr.length !== 0 && LotteryTsGidArr.length % 2 !== 0 && <div className={styles.oddCont}>
                  <div className={styles.firstBox} style={{ background: `${colorArr[0].bg}` }}>
                    <div className={styles.left}>
                      <img src={LotteryTsGidArr[0].imgUrl} />
                      <div className={styles.words}>
                        <p style={{ color: colorArr[0].color }}>{LotteryTsGidArr[0].itemTitle}</p>
                        <span style={{ color: colorArr[0].color }}>Online: {LotteryTsGidArr[0].contentTwo}</span>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.pr} style={{ color: colorArr[0].color, border: `0.02rem solid ${colorArr[0].color}` }} onClick={LotteryTsGidArr[0].clickable == 0 ? () => this.navgatePage(LotteryTsGidArr[0], '5') : () => { }}>Practice</div>
                      <div className={styles.pl} style={{ background: colorArr[0].color, border: `0.02rem solid ${colorArr[0].color}` }} onClick={LotteryTsGidArr[0].clickable == 0 ? () => this.navgatePage(LotteryTsGidArr[0], '0') : () => { }}>Play Now</div>
                    </div>
                  </div>
                  {LotteryTsGidArr.slice(1, LotteryTsGidArr.length).map((i, v) => {
                    return (
                      <div className={styles.listItem} key={v + 'lo'} style={{ background: `${colorArr[v + 1].bg}` }}>
                        <div className={styles.top}>
                          <img src={i.imgUrl} />
                          <div className={styles.words}>
                            <p style={{ color: colorArr[v + 1].color }}>{i.itemTitle}</p>
                            <span style={{ color: colorArr[v + 1].color }}>Online: {i.contentTwo}</span>
                          </div>
                        </div>
                        <div className={styles.bottom}>
                          <div className={styles.pr} style={{ color: colorArr[v + 1].color, border: `0.02rem solid ${colorArr[v + 1].color}` }} onClick={i.clickable == 0 ? () => this.navgatePage(i, '5') : () => { }}>Practice</div>
                          <div className={styles.pl} style={{ background: colorArr[v + 1].color, border: `0.02rem solid ${colorArr[v + 1].color}` }} onClick={i.clickable == 0 ? () => this.navgatePage(i, '0') : () => { }}>Play Now</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                }
                {
                  LotteryTsGidArr.length !== 0 && LotteryTsGidArr.length % 2 == 0 && <div className={styles.evenCont}>
                    {LotteryTsGidArr.map((i, v) => {
                      return (
                        <div className={styles.listItem} key={v + 'lo'} style={{ background: `${colorArr[v + 1].bg}` }}>
                          <div className={styles.top}>
                            <img src={i.imgUrl} />
                            <div className={styles.words}>
                              <p style={{ color: colorArr[v + 1].color }}>{i.itemTitle}</p>
                              <span style={{ color: colorArr[v + 1].color }}>Online: {i.contentTwo}</span>
                            </div>
                          </div>
                          <div className={styles.bottom}>
                            <div className={styles.pr} style={{ color: colorArr[v + 1].color, border: `0.02rem solid ${colorArr[v + 1].color}` }} onClick={i.clickable == 0 ? () => this.navgatePage(i, '5') : () => { }}>Practice</div>
                            <div className={styles.pl} style={{ background: colorArr[v + 1].color, border: `0.02rem solid ${colorArr[v + 1].color}` }} onClick={i.clickable == 0 ? () => this.navgatePage(i, '0') : () => { }}>Play Now</div>
                          </div>
                          {v <= 1 && <img src={require('@/assets/img/home/home_hot.png')} className={styles.hotTag} />}
                        </div>
                      )
                    })}
                  </div>
                }
              </div>
            </div>

            {/*  */}
            <div className={styles.winnerCont} onClick={() => this.navigateTo('winner')}>
              <div className={styles.top}>
                <p>RANK</p>
                <img src={require('@/assets/img/home/arrow.png')} />
              </div>
              <div className={styles.winnerList}>
                {winnerList.length !== 0 && winnerList.map((i, v) => {
                  let obj = {
                    avatarUrl: ava,
                    nickName: 'Silly Pig'
                  }
                  return <div key={v + Math.random()} className={styles.listItem} style={v == winnerList.length - 1 ? { marginRight: 0 } : {}}>
                    <div className={styles.profileDiv}>
                      <div style={{ background: `url(${obj.avatarUrl}) no-repeat center center`, backgroundSize: 'cover' }}></div>
                    </div>
                    <div className={styles.num}>
                      <img src={v <= 2 ? require(`@/assets/img/home/num_${v}.png`) : require(`@/assets/img/home/num_e.png`)} />
                      <p>{v >= 3 ? v + 1 : ''}</p>
                    </div>
                    <p className={styles.name}>{obj.nickName}</p>
                  </div>
                })}
              </div>
            </div>
            <div className={styles.dotWrap}><div className={styles.dot}></div></div>
          </div>
        </PullToRefresh>
      </div>
    )
  }
}
