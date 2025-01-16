import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../public/logo.png"

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className='p-8'>
            <div className='max-w-5xl mx-auto flex flex-col items-center gap-4 pb-4 border-b border-b-slate-400'>

            <Link href="/" className="mr-8">
                <Image
                    src={logo}
                    alt="Disney"
                    width={80}
                    height={40}

                    priority
                />
            </Link>
            <p className='text-sm text-slate-600 text-center'>For educational use only. All characters and content are the property of Disney. This test is for private use and development testing only and should not be distributed for public consumption </p>
            </div>
            <section>&copy; {currentYear} All rights Reserved . <Link href="https://nathanielessien.vercel.app" target='_blank'>Nathaniel Essien</Link></section>
        </footer>
    )
}

export default Footer