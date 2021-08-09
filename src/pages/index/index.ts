import './index.scss'
let routeView = document.getElementById('routeView')
  const view = new Map()
  view.set('#/home', '首页')
  view.set('#/about', '关于')
  const render = () => {
    let hash = location.hash
    routeView.innerHTML = view.get(hash)
  }
  window.addEventListener('hashchange', () => {
    render()
  })

  window.addEventListener('DOMContentLoaded', () => {
    if (!location.hash) {
      location.hash = '/'
    } else {
      render()
    }
  })