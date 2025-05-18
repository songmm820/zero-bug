/**
 * Views：home dashboard 界面
 * @author songmm
 */
import DashboardMain from '@/views/home/DashboardMain.tsx'

function Home() {
  return (
    <>
      <main className="bg-[#333] flex flex-col w-full h-full overflow-auto">
        {/* main */}
        <DashboardMain />
      </main>
    </>
  )
}

export default Home
