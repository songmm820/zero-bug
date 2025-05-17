/* eslint-disable no-var */

declare global {
  var Tools: {
    /**
     * 日志
     * @type {import("@/utils/logger").default}
     */
    Logger: typeof import('@/utils/logger').default

    /**
     * 本地存储
     * @type {import("@/utils/storage-util").LocalStorageInstance}
     */
    LocalStorage: typeof import('@/utils/storage-util').LocalStorageInstance

    /**
     * 会话存储
     * @type {import("@/utils/storage-util").SessionStoraInstance}
     */
    SessionStorage: typeof import('@/utils/storage-util').SessionStoraInstance
  }
}

export {}
