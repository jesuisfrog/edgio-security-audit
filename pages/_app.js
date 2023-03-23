import '@/styles/globals.css'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import DomainSearch from '@/components/Form'


const MyApp = () => {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#9a1ab1] via-[#004966] to-[#01B18D]">
      <Navbar />
      <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-5 md:px-0">
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col items-start justify-start rounded p-5">
            <h1 className="text-xl font-bold text-white">Web Security Audit</h1>
              <DomainSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApp
