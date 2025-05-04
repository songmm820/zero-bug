/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 工具函数：操作浏览器的IndexedDB
 * @author songmm
 */

export class IndexedDBHelperClass {
  private dbName: string
  private version: number
  private db: IDBDatabase | null = null

  /**
   * 构造函数
   * @param dbName 数据库名称
   * @param version 数据库版本
   */
  constructor(dbName: string, version: number = 1) {
    this.dbName = dbName
    this.version = version
  }

  /**
   * 获取兼容的 indexedDB 对象
   */
  private get indexedDB(): IDBFactory {
    return window.indexedDB || (window as any).webkitIndexedDB || (window as any).mozIndexedDB || (window as any).msIndexedDB
  }

  /**
   * 连接数据库
   * @param storeNames 需要创建的存储空间名称数组
   * @param keyPath 主键字段名（可选）
   */
  public connectDB(storeNames: string[], keyPath: string = 'id'): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (!this.indexedDB) {
        reject(new Error('您的浏览器不支持IndexedDB'))
        return
      }

      const request = this.indexedDB.open(this.dbName, this.version)

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建所有指定的存储空间
        storeNames.forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath })
          }
        })
      }
    })
  }

  /**
   * 添加数据
   * @param storeName 存储空间名称
   * @param data 要添加的数据
   */
  public insert<T>(storeName: string, data: T): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'))
        return
      }

      const transaction = this.db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }

  /**
   * 通过key读取数据
   * @param storeName 存储空间名称
   * @param key 主键值
   */
  public selectOneByKey<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'))
        return
      }

      const transaction = this.db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onsuccess = () => resolve(request.result)
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }

  /**
   * 更新数据
   * @param storeName 存储空间名称
   * @param data 要更新的数据（必须包含主键）
   */
  public updateByKey<T extends { [key: string]: any }>(storeName: string, data: T): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'))
        return
      }

      const transaction = this.db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => resolve(true)
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }

  /**
   * 删除数据
   * @param storeName 存储空间名称
   * @param key 主键值
   */
  public deleteByKey(storeName: string, key: IDBValidKey): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'))
        return
      }

      const transaction = this.db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onsuccess = () => resolve(true)
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }

  /**
   * 获取所有数据
   * @param storeName 存储空间名称
   */
  public selectAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未连接'))
        return
      }

      const transaction = this.db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }
  /**
   * 关闭数据库连接
   */
  public closeDB(): void {
    if (this.db) {
      this.db.close()
    }
  }

  /**
   * 删除数据库
   */
  public deleteDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.deleteDatabase(this.dbName)

      request.onsuccess = () => resolve()
      request.onerror = (event) => reject((event.target as IDBRequest).error)
    })
  }
}

// 创建实例
/* const dbHelper = new IndexedDBHelperClass('testDB', 1)
await dbHelper.connectDB(['users'], 'id') */
