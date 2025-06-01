/**
 * Views：home dashboard 界面
 * @author songmm
 */

import HomeMain from '@/views/home/HomeMain.tsx'

function Home() {
  return (
    <>
      <main className="flex flex-col w-full h-full overflow-auto">
        <HomeMain />
      </main>
    </>
  )
}

export default Home
