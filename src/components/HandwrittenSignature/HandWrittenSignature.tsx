/**
 * Component：手写签名组件
 * @author songmm
 */

import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import ColorPicker from '@/components/ColorPicker/ColorPicker.tsx'

export interface IProps {
  /**
   * 绘制区域宽度
   */
  width?: number
  /**
   * 绘制区域高度
   */
  height?: number
  /**
   * 清空重新绘制函数
   */
  clear?: () => void
  /**
   * 获取签名数据函数
   */
  getSignature?: (signature: string) => void
}

export interface ISignatureRef {
  /**
   * 清空签名
   */
  clearSignature: () => void
  /**
   * 获取签名数据
   */
  getSignature: () => string | null
}

function HandWrittenSignature(props: IProps, ref: Ref<ISignatureRef>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  // 画布上下文设置
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null)
  // 画笔颜色
  const [paintingBrushColor, setPaintingBrushColor] = useState<string>('#000000')

  // 设置画布属性
  function setCanvasAttr() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    setContext(ctx)
    // 设置绘制样式
    ctx.lineWidth = 1
    // 设置画笔颜色
    ctx.strokeStyle = '#0062ff'
    ctx.lineCap = 'round'
    // 设置画布宽高
    canvas.width = props.width || 800
    canvas.height = props.height || 600
    // 缓存画布位置
    setCanvasRect(canvas.getBoundingClientRect())
  }

  // 计算坐标
  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRect) return { x: 0, y: 0 }
    const { left, top } = canvasRect
    return {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }

  // 开始绘制
  function onStartDraw(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!context) return
    const { x, y } = getCoordinates(event)
    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
  }

  // 绘制中
  function onDrawing(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!context || !isDrawing) return
    const { x, y } = getCoordinates(event)
    context.lineTo(x, y)
    context.stroke()
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

  // 获取签名图像数据
  function getSignature() {
    if (canvasRef.current) {
      // 获取签名的 base64 图像
      return canvasRef.current.toDataURL()
    } else {
      throw new Error('手写签名异常')
    }
  }

  // 清空签名，重新绘制
  function clearSignature() {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  // 改变画笔颜色
  function handleColorChange(value: string) {
    setPaintingBrushColor(value)
    // 更新画布设置
    if (context) {
      context.strokeStyle = value
    }
  }

  useImperativeHandle(ref, () => ({
    clearSignature: clearSignature,
    getSignature: getSignature
  }))

  useEffect(() => {
    setCanvasAttr()
  }, [])

  return (
    <>
      <div className="p-5 bg-white rounded-2xl flex flex-col items-center justify-center gap-4">
        {/* 颜色选择器 */}
        <div>
          <ColorPicker value={paintingBrushColor} onChange={handleColorChange} />
        </div>

        <canvas
          className="border-dashed border-1 rounded-xl border-gray-700"
          ref={canvasRef}
          onMouseDown={onStartDraw}
          onMouseMove={onDrawing}
          onMouseUp={onStopDraw}
          onMouseLeave={onStopLeave}
        ></canvas>

        <div className="flex justify-center gap-5">
          <button className="text-background" onClick={getSignature}>
            保存签名
          </button>
          <button className="text-background" onClick={clearSignature}>
            清空签名
          </button>
        </div>
      </div>
    </>
  )
}

export default forwardRef(HandWrittenSignature)
