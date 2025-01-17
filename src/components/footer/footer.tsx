import Image from 'next/image'
import Link from 'next/link'
import logo from "../../../public/logo.png"

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className='p-8 text-slate-600 md:text-center'>
            <div className='max-w-6xl mx-auto flex flex-col md:items-center gap-4 pb-4 border-b border-b-slate-200'>

            <Link href="/" className="mr-8">
                <Image
                    src={logo}
                    alt="Disney"
                    width={80}
                    height={40}

                    priority
                />
            </Link>
            <p className='text-sm'>For educational use only. All characters and content are the property of Disney.</p>
            </div>
            <section className='text-center mt-4 text-sm  font-[family-name:var(--font-geist-sans)]'>&copy; {currentYear} All rights Reserved <Link href="https://nathanielessien.vercel.app" className='font-bold text-green-700' target='_blank'>Nathaniel Essien</Link></section>
        </footer>
    )
}

export default Footer