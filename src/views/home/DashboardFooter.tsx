/**
 * Views：home footer
 * @author songmm
 */
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

  const FooterCol = ({ item }: { item: IFooterItem }) => {
    return (
      <div className="flex flex-col">
        <div className="text-[14px] font-bold">{item.label}</div>
        <div className="mt-[12px] flex flex-col gap-[8px]">
          {item.hrefs?.map((href, index) => {
            return <div key={index}>{href.label}</div>
          })}
        </div>
      </div>
    )
  }

  const FooterCols = () => {
    return (
      <>
        <div className="h-full p-[32px] grid grid-cols-3 gap-[24px]">
          {footerHrefs.map((col, index) => {
            return <FooterCol item={col} key={index} />
          })}
        </div>
      </>
    )
  }

  return (
    <div className="h-[240px] bg-[rgba(229,230,235,0.5)]">
      <FooterCols />
    </div>
  )
}

export default DashboardFooter
