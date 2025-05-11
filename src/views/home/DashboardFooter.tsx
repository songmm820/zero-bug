/**
 * Views：Home Footer
 * @author songmm
 */

import Logo from '@/components/Logo/Logo.tsx'

type IFooterItem = {
  label: string
  hrefs?: { label: string }[]
}

function DashboardFooter() {
  // 底部item
  const footerHrefs: IFooterItem[] = [
    {
      label: '关于我们',
      hrefs: [{ label: '关于工具' }, { label: '使用条款' }, { label: '隐私政策' }, { label: '联系我们' }]
    },
    {
      label: '帮助中心',
      hrefs: [{ label: '常见问题' }, { label: '意见反馈' }, { label: '使用指南' }]
    },
    {
      label: '技术支持',
      hrefs: [{ label: '技术文档' }, { label: 'API接口' }]
    }
  ]

  // 底部左侧
  const FooterLeft = () => {
    return (
      <div className="text-[#fff] h-full flex flex-col justify-center items-center">
        <div className="flex justify-between items-center gap-[24px]">
          <Logo size={42} />
          <div className="text-[14px]">© 2025 {import.meta.env.VITE_APP_TITLE} . 保留所有使用权利</div>
        </div>
      </div>
    )
  }

  // 底部列 item
  const FooterCol = ({ item }: { item: IFooterItem }) => {
    return (
      <div className="flex flex-col text-[#fff]">
        <div className="text-[14px] font-bold">{item.label}</div>
        <div className="mt-[12px] flex flex-col gap-[8px] ">
          {item.hrefs?.map((href, index) => {
            return (
              <div className="cursor-pointer" key={index}>
                {href.label}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // 底部列
  const FooterCols = () => {
    return (
      <>
        <div className="text-[12px] h-full flex justify-around gap-[24px]">
          {footerHrefs.map((col, index) => {
            return <FooterCol item={col} key={index} />
          })}
        </div>
      </>
    )
  }

  return (
    <div className="h-[240px] p-[32px] flex bg-[#101827] flex-row max-phone:flex-col-reverse">
      <div className="flex-1 max-phone:mt-[24px]">
        <FooterLeft />
      </div>
      <div className="w-[50%] max-phone:w-full">
        <FooterCols />
      </div>
    </div>
  )
}

export default DashboardFooter
