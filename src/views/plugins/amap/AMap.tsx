/**
 * Views：高德地图
 * @author songmm
 */

import { IAMap, loadAMap, locateCity } from '@/utils/amap.ts'
import { useEffect } from 'react'

function AMap() {
  let mapResponse: IAMap

  useEffect(() => {
    loadAMap('amap-container').then((response) => {
      mapResponse = response
      locateCity(response.AMap, response.map)
    })
    return () => {
      mapResponse?.destroy()
    }
  }, [])

  return <div id="amap-container" className="w-[400px] h-[400px] rounded-[8px] common-shadow-2"></div>
}

export default AMap
