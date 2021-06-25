import './index.scss'
import React, { useState } from 'react'

let timer = null // 定时器控制进度条
let totalTime = 3000 // 设定视频播放时常
const Home = () => {
  // const [progress, setProgress] = useState(0) // 进度
  const [isPlay, setIsPlay] = useState(false) // 控制播放暂停
  const [type, setType] = useState(0)
  const [count, setCount] = useState(0)

  const handlerProgress = (pre) => {
    console.log(pre)
    if (pre < 100) return pre + 1
    else {
      alert('播放结束')
      return 0
    }
  }

  // 播放暂停
  const handleVideo = () => {
    setIsPlay(!isPlay)
    // isPlay ? clearInterval(timer) : timer = setInterval(() => setProgress(handlerProgress), totalTime / 100)
  }

  const replay = () => {
    setIsPlay(true)
    setType(type ? 0 : 1)
    // if (timer) clearInterval(timer)
    // setProgress(0)
    // timer = setInterval(() => setProgress(handlerProgress), totalTime / 100)
  }
  const end = () => {
    setCount(count + 1)
    replay()
  }
  return (
    <div>
      <button onClick={ handleVideo }>{ isPlay ? '暂停' : '播放' }</button>
      <button onClick={ replay }>重播</button>
      <span>{ `播放次数为：${count}` }</span>
      <div className="progress-box">
        {/* <div className="progress" style={{ width: `${progress}%` }}/> */}
        <div
          className={ `progress ${ isPlay ? 'play' : 'pause' }` }
          style={{
            animationDuration: `${totalTime}ms`,
            animationName: `${type ? 'replay' : 'play'}`
          }}
          onAnimationEnd={end}
        >

        </div>
      </div>
    </div>
  )
}

export default Home