/**
 * Component：手写签名组件
 * @author songmm
 */

import { forwardRef, memo, MouseEvent, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import SignatureSettingTools from '@/components/HandWrittenSignature/SignatureSettingTools.tsx'

export interface ISignatureProps {
  /**
   * 绘制区域宽度
   */
  width?: number
  /**
   * 绘制区域高度
   */
  height?: number
}

export interface ISignatureRef {
  /**
   * 清空签名
   */
  clearSignature: () => void
  /**
   * 获取签名数据
   */
  getSignature?: (format: 'base64' | 'blob') => Promise<string | Blob | null | undefined>
  /**
   * 撤销上一步
   */
  undo: () => void
}

function HandWrittenSignature(_props: ISignatureProps, ref: Ref<ISignatureRef>) {
  // 容器Ref
  const containerRef = useRef<HTMLDivElement | null>(null)
  // 画布Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // 绘画状态
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  // 画布上下文设置
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  // 画布位置
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null)
  // 画笔颜色
  const [paintingBrushColor, setPaintingBrushColor] = useState<string>('#0062FF')
  // 绘制路径栈，并且保存每个路径的颜色，以便撤销时恢复颜色
  const paths = useRef<{ points: { x: number; y: number }[]; color: string }[]>([])

  // 设置画布属性
  function setCanvasAttr() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    // 画布尺寸取canvas元素尺寸
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    // 设置线宽
    ctx.lineWidth = 4
    // 设置端点形状 butt | round | square
    ctx.lineCap = 'round'
    // 设置线条连接方式 round | bevel | miter
    ctx.lineJoin = 'round'
    // 设置画笔颜色
    ctx.strokeStyle = paintingBrushColor
    // 设置全局透明度
    ctx.globalAlpha = 1
    setContext(ctx)
    // 缓存画布位置
    setCanvasRect(canvas.getBoundingClientRect())
  }

  // 计算坐标
  function getCoordinates(event: MouseEvent<HTMLCanvasElement>) {
    if (!canvasRect) return { x: 0, y: 0 }
    const { left, top } = canvasRect
    return {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }

  // 开始绘制
  function onStartDraw(event: MouseEvent<HTMLCanvasElement>) {
    if (!context) return
    const { x, y } = getCoordinates(event)
    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
    // 开始新的路径并记录当前颜色
    paths.current.push({ points: [{ x, y }], color: paintingBrushColor })
  }

  // 绘制中
  function onDrawing(event: MouseEvent<HTMLCanvasElement>) {
    if (!context || !isDrawing) return
    const { x, y } = getCoordinates(event)
    context.lineTo(x, y)
    context.stroke()
    // 保存当前路径点
    paths.current[paths.current.length - 1].points.push({ x, y })
  }

  // 停止绘制
  function onStopDraw() {
    if (!context) return
    // 重置路径，停止绘制
    context.beginPath()
    // 设置为停止绘制状态
    setIsDrawing(false)
  }

  // 离开画布
  function onStopLeave() {
    onStopDraw()
  }

  // 重新绘制所有路径
  function redrawAllPaths() {
    if (!context) return
    paths.current.forEach((path) => {
      context.beginPath()
      context.moveTo(path.points[0].x, path.points[0].y)
      // 使用路径记录的颜色
      context.strokeStyle = path.color
      path.points.forEach((point) => {
        context.lineTo(point.x, point.y)
        context.stroke()
      })
    })
  }

  // 撤销上一次笔画
  function undo() {
    if (!context || !paths.current.length) return
    if (paths.current.length === 0) return
    // 弹出最后一个路径
    paths.current.pop()
    // 清空画布
    clearSignature()
    // 重新绘制剩下的路径
    redrawAllPaths()
    // 如果全部已经撤销，恢复当前画笔颜色
    if (paths.current.length === 0) {
      context.strokeStyle = paintingBrushColor
    }
  }

  // 获取签名图像数据
  function getSignature(format: 'base64' | 'blob' = 'base64'): Promise<string | Blob | null | undefined> {
    if (canvasRef.current) {
      // 返回base64格式
      if (format === 'blob') {
        return new Promise((resolve) => {
          canvasRef.current?.toBlob(resolve)
        })
      }
      // 返回base64格式
      return new Promise((resolve) => {
        resolve(canvasRef.current?.toDataURL())
      })
    } else {
      throw new Error('手写签名异常')
    }
  }

  // 清空签名，重新绘制
  function clearSignature() {
    if (!context || !canvasRef.current) return
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  // 改变画笔颜色
  function handleColorChange(value: string) {
    if (!context) return
    if (value === paintingBrushColor) return
    setPaintingBrushColor(value)
    // 更新画布设置
    context.strokeStyle = value
  }

  useImperativeHandle(ref, () => ({
    clearSignature,
    getSignature,
    undo
  }))

  useEffect(() => {
    // 如果canva为空或者上下文存在，则不重新设置canvas属性
    if (!canvasRef.current || context) return
    setCanvasAttr()
  }, [context])

  return (
    <>
      <div ref={containerRef} className="w-full h-full p-5 flex flex-col items-center justify-center gap-4">
        <canvas className="bg-white flex-1 w-full" ref={canvasRef} onMouseDown={onStartDraw} onMouseMove={onDrawing} onMouseUp={onStopDraw} onMouseLeave={onStopLeave} />

        <SignatureSettingTools color={paintingBrushColor} onChangeColor={handleColorChange} />
      </div>
    </>
  )
}

export default memo(forwardRef(HandWrittenSignature))
