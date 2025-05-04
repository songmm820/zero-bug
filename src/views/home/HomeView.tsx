/**
 * Views：home dashboard 界面
 * @author songmm
 */
import DashboardHeader from '@/views/home/DashboardHeader.tsx'
import DashboardMain from '@/views/home/DashboardMain.tsx'
import DashboardFooter from '@/views/home/DashboardFooter.tsx'

function Home() {
  return (
    <>
      <main className="bg-[#f5f5f7] flex flex-col w-full h-full overflow-auto">
        {/* header */}
        <DashboardHeader />
        {/* main */}
        <DashboardMain />
        {/* footer */}
        <DashboardFooter />
      </main>
    </>
  )
}

export default Home
