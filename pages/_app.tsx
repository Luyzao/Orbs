import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../src/styles/globals.css'
import SideBar from '@/components/sideBar'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const hideSidebar = router.pathname.startsWith('/auth')

  return (
    <main
      className={`bg-white ${!hideSidebar ? 'flex' : ''} ${typeof window !== 'undefined' && window.innerWidth < 768 ? 'pt-16' : ''}`}
    >
      {!hideSidebar && <SideBar />}
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
