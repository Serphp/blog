import '@/styles/globals.scss'
import Layout from './components/Layout'
import type { AppProps } from 'next/app'
import { PostContextProvider } from './components/Context/PostContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PostContextProvider> 
        <Component {...pageProps} />
      </PostContextProvider>
    </Layout>
  )
}
