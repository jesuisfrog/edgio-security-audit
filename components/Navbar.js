import Link from 'next/link'
import { createNextDataURL } from '@edgio/next/client'

const Navbar = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-between py-3 px-5">
        <Link href="/">
          <a>
            <img src="/logo/white.svg" className="h-[25px] w-[60.2px] bg-white/5" />
          </a>
        </Link>
    </div>
  )
}

export default Navbar
