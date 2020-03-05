import axios from 'axios'
import store from '@/store'
import { Notice } from 'view-design'
import Qs from 'qs'
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

axios.defaults.withCredentials = true // 带cookie请求
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class HttpRequest {
  constructor (baseUrl = baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {} // 请求队列
  }
  getInsideConfig (url) {
    // console.log(url)
    let gameName = store.state.game.gameName
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // 'game-code' :gameName
      }
    };
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide();//等待动画结束
    }
  }
  // 拦截器
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      let gameName = store.state.game.gameName
      if (gameName !== '') {
        config.headers['game-code'] = gameName
      }
      // 添加全局的loading动画
      if (!Object.keys(this.queue).length) {
        // Spin.show();//加载动画 不建议开启，因为界面不友好
      }
      this.queue[url] = true // 请求队列
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (status >= 200 && status < 300) { // HTTP状态码为200时
        const ERRORCODE = [201, 403, 400, 500]
        if (ERRORCODE.includes(data.code)) {
          Notice.warning({
            title: '请求有误',
            desc: data.msg
          })
          if (data.code === 403) {
            setTimeout(() => {
              router.replace({ name: 'login' })
              // window.location.href = '/index.html'
            }, 1000)
          }
        }
        return data
      } else {
        Notice.warning({
          title: 'HTTP请求有误',
          desc: `状态码为${status}`
        })
      }
    }, function (error) {
      let errorMsg = error.response.data
      let { code, msg } = errorMsg
      Notice.warning({
        title: `状态码:${code}`,
        desc: msg
      })
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
