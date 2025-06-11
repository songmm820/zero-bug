/**
 * Views：Main
 * @author songmm
 */

import HandwrittenSignature from '@/components/HandwrittenSignature/HandWrittenSignature.tsx'

function HomeMain() {
  return (
    <main className="flex-1 p-4 flex flex-col items-center justify-center">
      <HandwrittenSignature />
    </main>
  )
}

export default HomeMain
