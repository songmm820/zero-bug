/**
 * Views：home dashboard 界面
 * @author songmm
 */

import HomeHeader from './header/HomeHeader.tsx'
import HomeMain from '@/views/home/HomeMain.tsx'

function Home() {
  return (
    <>
      <main className="flex flex-col w-full h-full overflow-auto">
        <HomeHeader />
        <HomeMain />
      </main>
    </>
  )
}

export default Home
