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
  const { user, loading } = useAuth()
  const isAuthPage = router.pathname.startsWith('/auth')

  useEffect(() => {
    if (loading) return
    if (!isAuthPage && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, isAuthPage, router])

  if (loading) return null

  return (
    <main className={`bg-white ${!hideSidebar ? 'flex' : ''}`}>
      {!hideSidebar && <SideBar />}
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
