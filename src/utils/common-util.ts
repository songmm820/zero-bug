/**
 * 生成随机字符串ID
 * @param length 生成的ID长度（默认9）
 * @returns 由字母和数字组成的随机字符串
 */
export function CreateID(length: number = 9): string {
  if (length <= 0) return '' // 边界情况处理

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buffer = new Uint8Array(Math.ceil(length / 2))
    crypto.getRandomValues(buffer)
    return Array.from(buffer)
      .map((b) => b.toString(36).padStart(2, '0'))
      .join('')
      .slice(0, Math.max(0, length)) // 防御性编程
  }

  return Math.random()
    .toString(36)
    .slice(2, 2 + Math.max(0, length))
    .padEnd(Math.max(0, length), '0')
}
