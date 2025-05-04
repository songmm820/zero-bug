/**
 * Views：自动检测更新弹窗
 * @author songmm
 */

import { useEffect, useState } from 'react'
import { Button, Modal } from '@arco-design/web-react'
import IconPark from '@/components/IconPark/IconPark'

type ISystemUpdateModalProps = {
  /* 是否显示 */
  visible: boolean
  /* 关闭弹窗 */
  onCancel?: () => void
  /* 确认弹窗 */
  onOk?: () => void
  /* 弹窗关闭后 */
  afterClose?: () => void
}

function SystemUpdateModal(props: ISystemUpdateModalProps) {
  const { visible, onCancel, onOk, afterClose } = props
  // Modal的显示与隐藏
  const [isVisible, setVisible] = useState(false)

  // 更新内容
  const updateList: string[] = ['新功能上线', '修复已知bug', '优化用户体验', '提升系统稳定性']

  // 点击确认按钮
  const handleOk = () => {
    if (onOk) {
      onOk()
    }
    setVisible(false)
  }

  // 点击取消按钮
  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    setVisible(false)
  }

  useEffect(() => {
    setVisible(visible)
  }, [])

  // 更新 List item
  const UpdateContentItem = ({ content }: { content: string }) => {
    return (
      <div className="text-[12px] text-gray-500 flex items-center">
        <IconPark icon="check-small" color="var(--color-success)" size={16} />
        <span className="ml-[2px]">{content}</span>
      </div>
    )
  }

  // 更新List
  const UpdateContentList = () => {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-4 mb-6 flex flex-col gap-[4px]">
        <div className="text-center mb-[8px]">新版本包含以下更新：</div>
        {updateList.map((item, index) => (
          <UpdateContentItem key={index} content={item} />
        ))}
      </div>
    )
  }

  // 更新按钮
  const UpdateButtons = () => {
    return (
      <div className="w-full flex justify-center gap-[32px]">
        <Button type="primary" size="large" onClick={handleOk}>
          <div className="flex items-center gap-[3px]">
            <IconPark icon="refresh" color="#fff" size={14} />
            <span>立刻更新</span>
          </div>
        </Button>
        <Button size="large" onClick={handleCancel}>
          5s后自动更新
        </Button>
      </div>
    )
  }

  // 版本变更提示
  const VersionChange = () => {
    return (
      <div className="text-[12px] text-gray-400 flex items-center">
        <span>当前版本：v1.0.0</span>
        <span className="ml-[4px] mr-[4px]"> → </span>
        <span>新版本：v1.0.1 </span>
      </div>
    )
  }

  return (
    <Modal
      className="relative bg-white rounded-lg w-[480px] flex flex-col items-center overflow-hidden"
      visible={isVisible}
      unmountOnExit
      simple
      afterClose={afterClose}
      footer={null}
      escToExit={false}
      maskClosable={false}
      autoFocus={false}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <div className="relative h-full flex flex-col items-center min-h-[380px]">
        <div className="absolute w-32 -top-[70px] -left-[70px] h-32 bg-primary/15 rounded-full"></div>
        <div className="absolute w-32 -bottom-[75px] -right-[75px] h-32 bg-success/15 rounded-full"></div>
        <div className="tsanger-yu-yang-t text-3xl text-primary mb-[12px] tracking-wider font-bold italic">{import.meta.env.VITE_APP_TITLE}</div>
        <div className="flex items-center gap-[8px] mb-[12px]">
          <IconPark icon="game-three" color="var(--color-success)" size={26} />
          <IconPark icon="trophy" color="var(--color-success)" size={23} />
        </div>
        <div className="text-2xl font-bold mb-4">版本更新</div>
        <UpdateContentList />
        <UpdateButtons />
        <div className="mt-[14px] flex items-center">
          <VersionChange />
        </div>
      </div>
    </Modal>
  )
}

export default SystemUpdateModal
