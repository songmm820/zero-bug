/// <reference types="vite/client" />

// 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_SECOND_DEPLOY_DIR: string
  readonly VITE_APP_TITLE: string
  readonly VITE_ICON_SCRIPT_URL: string
  readonly VITE_AMAP_WEB_KEY: string
  readonly VITE_AMAP_JSAPI_KEY: string
  readonly VITE_WHY_API_KEY: string
  readonly VITE_BAIDU_FANYI_APP_ID: string
  readonly VITE_BAIDU_FANYI_KEY: string
  readonly VITE_AXIOS_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
