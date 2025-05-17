/**
 * 枚举：日志级别
 */
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger {
  /**
   * 日志级别
   */
  private static level: LogLevel = LogLevel.DEBUG

  // 日志级别与颜色映射
  private static levelColors: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: '\x1b[36m', // 青色
    [LogLevel.INFO]: '\x1b[32m', // 绿色
    [LogLevel.WARN]: '\x1b[33m', // 黄色
    [LogLevel.ERROR]: '\x1b[31m' // 红色
  }

  /**
   * 获取当前时间戳
   * @returns 本地时间 YYYY-MM-DD HH:mm:ss
   */
  private static getTimestamp() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const date = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
  }

  /**
   * 打印日志
   * @param level 日志级别
   * @returns 日志实例
   */
  private static shouldLog(level: LogLevel) {
    // 按照级别从低到高排序
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR]
    return levels.indexOf(level) >= levels.indexOf(this.level)
  }

  /**
   * 打印日志
   * @param level 日志级别
   * @param message 日志信息
   */
  private static log(level: LogLevel, message: string) {
    if (this.shouldLog(level)) {
      const color = this.levelColors[level]
      const timestamp = this.getTimestamp()
      // 打印日志并附带时间戳和颜色
      // eslint-disable-next-line no-console
      console.log(`${timestamp} ${color}[${level}] \x1b[0m${message}`)
    }
  }

  /**
   * 打印调试信息
   * @param message 日志信息
   */
  public static debug(message: string) {
    this.log(LogLevel.DEBUG, message)
  }

  /**
   * 打印普通信息
   * @param message 日志信息
   */
  public static info(message: string) {
    this.log(LogLevel.INFO, message)
  }

  /**
   * 打印警告信息
   * @param message 日志信息
   */
  public static warn(message: string) {
    this.log(LogLevel.WARN, message)
  }

  /**
   * 打印错误信息
   * @param message 日志信息
   */
  public static error(message: string) {
    this.log(LogLevel.ERROR, message)
  }
}

export default Logger
