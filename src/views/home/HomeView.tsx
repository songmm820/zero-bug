/**
 * Views：home dashboard 界面
 * @author songmm
 */
import { Button } from '@/components/ui/button'

function Home() {
  return (
    <>
      <main className="flex flex-col w-full h-full overflow-auto">
        <div className="max-phone:text-[32px]">
          <Button>Click me</Button>
        </div>
      </main>
    </>
  )
}

export default Home
