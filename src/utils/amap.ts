/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * utils：高德地图
 * @author songmm
 */
import AMapLoader from '@amap/amap-jsapi-loader'

export type IAMap = {
  /* AMap */
  AMap?: any
  /* 地图实例 */
  map?: any
  /* 地图销毁函数 */
  destroy: () => void
}

/**
 * 加载高德地图
 * @param id 地图容器 id
 */
export async function loadAMap(id: string): Promise<IAMap> {
  if (!import.meta.env.VITE_AMAP_JSAPI_KEY) {
    throw new Error('高德地图JS API Key未配置')
  }
  if (!import.meta.env.VITE_AMAP_JSAPI_SECURITY_CODE) {
    throw new Error('高德地图安全密钥未配置')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window._AMapSecurityConfig = {
    securityJsCode: import.meta.env.VITE_AMAP_JSAPI_SECURITY_CODE
  }

  /**
   * 移除 js api 安全密钥
   */
  const deleteSecurityCode = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete window._AMapSecurityConfig
  }

  const loadAMapParams = {
    // 申请好的 Web 端开发者 Key，首次调用 load 时必填
    key: import.meta.env.VITE_AMAP_JSAPI_KEY,
    // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    version: '2.0',
    // 是否为3D地图模式
    viewMode: '2D',
    // 初始化地图层级
    zoom: 17
  }
  const AMap = await AMapLoader.load(loadAMapParams)
  // 创建地图实例
  const map = new AMap.Map(id)
  AMap.plugin(['AMap.ControlBar', 'AMap.ToolBar', 'AMap.CitySearch', 'AMap.Scale'], async () => {
    // 加载插件 【地图旋转插件】
    map.addControl(insertControlBar(AMap))
    // 加载插件 【地图缩放插件】
    map.addControl(insertToolBar(AMap))
    // 加载插件 【地图比例尺插件】
    map.addControl(insertScale(AMap))
  })

  // 返回销毁函数
  return {
    map: map,
    AMap: AMap,
    destroy: () => {
      map?.destroy()
      deleteSecurityCode()
    }
  }
}

/**
 * 添加地图旋转插件
 */
export function insertControlBar(AMap: any) {
  return new AMap.ControlBar({
    position: {
      right: '10px',
      top: '10px'
    }
  })
}

/**
 * 地图缩放插件
 */
export function insertToolBar(AMap: any) {
  return new AMap.ToolBar({
    position: {
      right: '40px',
      top: '110px'
    }
  })
}

/**
 * 地图比例尺插件
 */
export function insertScale(AMap: any) {
  return new AMap.Scale({
    position: {
      right: '10px',
      bottom: '10px'
    }
  })
}

/**
 * 地图城市定位 自动获取用户IP，返回当前城市
 */
export function locateCity(AMap: any, map: any): any {
  const citySearch = new AMap.CitySearch()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  citySearch.getLocalCity(async function (status, result) {
    if (status === 'complete' && result.info === 'OK') {
      // 查询成功，result即为当前所在城市信息
      map?.setBounds(result.bounds)
    }
  })
}
