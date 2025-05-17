/**
 * Storage 工具类
 * @author songmm
 */
class StorageClass {
  private prefix: string
  private storage: Storage

  /**
   * 构造函数
   * @param storage Storage 实例
   * @param prefix 存储的键名前缀
   */
  constructor(storage: Storage, prefix: string) {
    this.storage = storage
    this.prefix = prefix
  }

  /**
   * Get item
   * @param key key
   */
  get(key: string): string | null {
    return this.storage.getItem(this.getPrefixedKey(key))
  }

  /**
   * Set item
   * @param key key
   * @param value value
   */
  set(key: string, value: string): void {
    this.storage.setItem(this.getPrefixedKey(key), value)
  }

  /**
   * Remove item
   * @param key key
   */
  remove(key: string): void {
    this.storage.removeItem(this.getPrefixedKey(key))
  }

  /**
   * Clear storage
   */
  clear(): void {
    this.storage.clear()
  }

  /**
   * 获取带前缀的 key
   * @param key key
   */
  private getPrefixedKey(key: string): string {
    return `${this.prefix}${key}`
  }
}

// 使用示例：带有统一前缀的 localStorage 和 sessionStorage 工具类
const prefixKey = `${import.meta.env.VITE_APP_KEY}_`
export const LocalStorageInstance = new StorageClass(localStorage, prefixKey)
export const SessionStorageInstance = new StorageClass(sessionStorage, prefixKey)
