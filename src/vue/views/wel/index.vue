<template>
  <div>
    <button @click="handleVideo">{{ isPlay ? '暂停' : '播放' }}</button>
    <button @click="replay">重播</button>
    <div class="progress-box">
      <!-- <div class="progress" :style="{ width: `${progress}%`}"/> -->
      <div 
        :class="{ 'progress': true, 'play': isPlay, 'pause': !isPlay }"
        
      >

      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
let timer = null // 定时器控制进度条
let totalTime = 3000 // 设定视频播放时常
export default {
  setup() {
    const isPlay = ref(false)
    const type = ref(0)
    const progress = ref(0)
    const setProgress = () => {
      if (progress.value < 100) progress.value += 1
      else {
        // alert('播放结束')
        progress.value = 0
      }
    }
    const handleVideo = () => {
      isPlay.value = !isPlay.value
      // console.log(isPlay.value, 'isPlay>>>')
      // !isPlay.value ? clearInterval(timer) : timer = setInterval(() => setProgress(), totalTime / 100)
    }
    const replay = () => {
      // clearInterval(timer)
      isPlay.value = true
      type.value = type.value ? 0 : 1
      console.log(type.value)
      // progress.value = 0
      // timer = setInterval(() => setProgress(), totalTime / 100)
    }
    return {
      isPlay,
      type,
      progress,
      totalTime,
      handleVideo,
      replay
    }
  }
}
</script>
<style lang="scss" scoped>
  .progress-box {
    height: 10px;
    width: 500px;
    border-radius: 5px;
    border: 1px solid black;
    .progress {
      height: 100%;
      width: 0;
      background-color: red;
      // animation: play 3s linear;
      animation-timing-function: linear;
      animation-name: play;
      animation-duration: 3000ms;
    }
  }
  .progress.play {
    animation-play-state: running;
  }
  .progress.pause {
    animation-play-state: paused;
  }
  @keyframes play {
    to {
      width: 100%;
    }
  }
  @keyframes replay {
    to {
      width: 100%;
    }
  }
</style>