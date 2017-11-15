import axios from 'axios'
import store from '../store'

// import { Indicator } from 'mint-ui'
const baseConfig = require('../../config')
// axios 通用配置
const config = {
  baseURL: baseConfig.env.apiServer,
  timeout: 5000
}
// 请求列表
const _requests = []
const errStatus = {
  404: '404,错误请求',
  401: '未授权',
  403: '禁止访问',
  408: '请求超时',
  413: '请求资源过大',
  500: '服务器内部错误',
  501: '功能未实现',
  503: '服务不可用',
  504: '网关错误'
}
// 自配置 axios 实例
const instance = axios.create(config)
// 在进行网络I/O时 锁定用户界面，等待至respone 或 timeout
const lockHttp = axios.create(config)

// 添加请求，显示loading
const pushRequest = config => {
  _requests.push(config)
  console.log(store)
  store.dispatch('changeLoading', true)
  // Indicator.open()
}
// 移除请求，无请求时关闭loading
const popRequest = config => {
  let _index = _requests.findIndex(index => {
    return index === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
  if (!_requests.length) {
    store.dispatch('changeLoading', false)
    // Indicator.close()
  }
}
// 请求开始加入loading
lockHttp.interceptors.request.use(config => {
  pushRequest(config.baseURL + config.url)
  return config
}, error => {
  return Promise.reject(error)
})
// 请求成功
const interceptorSuccess = response => {
  return new Promise((resolve, reject) => {
    if (response.data.code === undefined || response.data.code >= 0) {
      resolve(response.data || {})
    } else {
      const error = {}
      error.msg = response.data.msg || '接口调用失败'
      reject(error)
    }
  })
}
// 请求失败
const interceptorFailed = err => {
  const error = err || {}
  const resMsg = (error.response && error.response.status && errStatus[error.response.status]) || ''
  error.msg = resMsg || error.msg || error.message || '接口调用失败'
  return Promise.reject(error)
}
lockHttp.interceptors.response.use(response => {
  return Promise.resolve({
    then: (onFulfill, onReject) => {
      /**
       定义拦截操作 只是移除timer和监听器 最终将response交出
       https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
      **/
      const handler = () => {
        // 清掉保险timer
        clearTimeout(timeout)
        // 确保代码块中 其他代码执行完毕
        setTimeout(() => {
          document.removeEventListener('transitionend', handler, false)
        }, 0)
        // 后续的then方法可以接着处理 这里通过onFulfill抛出的response 执行后续操作
        onFulfill(response)
      }
      // 在侦测到动画结束时启动拦截操作
      document.addEventListener('transitionend', handler, false)
      // 加层保险
      const timeout = setTimeout(() => {
        handler()
      }, 400)
      popRequest(response.config.url)
    }
  })
}, error => {
  popRequest(error.config.url)
  return interceptorFailed(error)
})
// 拦截器
lockHttp.interceptors.response.use(
  interceptorSuccess, interceptorFailed)
instance.interceptors.response.use(
  interceptorSuccess, interceptorFailed)
instance.lock = function () {
  return lockHttp
}
// promise.all
lockHttp.all = instance.all = axios.all
export default instance
export { lockHttp }
