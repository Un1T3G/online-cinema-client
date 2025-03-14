import Image from 'next/image'
import Link from 'next/link'
import logo from 'shared/assets/logo.svg'

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 p-4 ">
      <Image src={logo} alt="logo" className="w-10 h-10" />
      <span className="text-xl font-bold">
        Cinema<span className="text-red-500">Hub</span>
      </span>
    </Link>
  )
}
