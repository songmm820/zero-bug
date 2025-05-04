/**
 * Storage 工具类
 * @author songmm
 */

type StorageUtil = {
  get: (key: string) => string | null
  set: (key: string, value: string) => void
  remove: (key: string) => void
  clear: () => void
}

/**
 * 创建 Storage 工具类
 * @param storage Storage 实例
 */
function createStorageUtil(storage: Storage): StorageUtil {
  /**
   *  Get item
   * @param key key
   */
  function get(key: string): string | null {
    return storage.getItem(key)
  }

  /**
   * Set item
   * @param key key
   * @param value value
   */
  function set(key: string, value: string): void {
    storage.setItem(key, value)
  }

  /**
   * Remove item
   * @param key key
   */
  function remove(key: string): void {
    storage.removeItem(key)
  }

  /**
   * Clear storage
   */
  function clear(): void {
    storage.clear()
  }

  return { get, set, remove, clear }
}

export const LocalStorageUtil = createStorageUtil(localStorage)
export const SessionStorageUtil = createStorageUtil(sessionStorage)
