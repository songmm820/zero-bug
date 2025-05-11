/**
 * utils：用户行为埋点
 * @author songmm
 */

/**
 * Ts类型：用户埋点数据结构
 */
type TrackingData = {
  /**
   * 埋点记录时间
   */
  timestamp: string
  /**
   * 浏览器信息
   */
  userAgent: string
  /**
   * 当前页面 URL
   */
  url: string
  /**
   * 引荐页面
   */
  referrer: string
  /**
   * 埋点事件
   */
  event: TrackEvent
}

/**
 * 行为动作
 */
type Action = 'INSERT' | 'QUERY' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'CLICK' | 'OTHER'

/**
 * Ts类型：用户埋点事件
 */
type TrackEvent = {
  /**
   * 埋点类型
   */
  type: 'pageview' | 'event'
  /**
   * 页面路由路径
   */
  path?: string
  /**
   * 事件动作
   */
  action?: Action
  /**
   * 事件标签（例如：新增**文件）
   */
  label?: string
}

const sendTrackingData = (event: TrackEvent) => {
  // 发送埋点数据
  const data: TrackingData = {
    event, // 事件名称
    timestamp: new Date().toISOString(), // 事件时间
    userAgent: navigator.userAgent, // 浏览器信息
    url: window.location.href, // 当前页面 URL
    referrer: document.referrer // 引荐页面
  }

  // @TODO 发送埋点数据
  console.log('埋点数据:', data)
}

/**
 * 埋点：页面访问
 * @param path 页面路径
 */
export const trackPageView = (path: string) => {
  sendTrackingData({ type: 'pageview', path })
}

/**
 * 埋点：点击事件
 */
export const trackEvent = (action: Action, label: string) => {
  sendTrackingData({ type: 'event', action, label })
}
