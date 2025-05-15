import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../src/styles/globals.css'
import SideBar from '@/components/sideBar'
import { AuthProvider, useAuth } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const hideSidebar = router.pathname.startsWith('/auth')

  return (
    <AuthProvider>
      <MainContent
        Component={Component}
        pageProps={pageProps}
        hideSidebar={hideSidebar}
      />
    </AuthProvider>
  )
}

function MainContent({ Component, pageProps, hideSidebar }: any) {
  const router = useRouter()
  const { user } = useAuth()
  console.log(user)
  const authLink = router.pathname.startsWith('/auth')

  useEffect(() => {
    if (!authLink && !user) {
      router.push('/auth/login')
    }
  }, [user, router, authLink])

  return (
    <main className={`bg-white ${!hideSidebar ? 'flex' : ''}`}>
      {!hideSidebar && <SideBar />}
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
