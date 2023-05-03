import '@/styles/globals.scss'
import Layout from './components/Layout'
import type { AppProps } from 'next/app'
import PostContextProvider from './components/Context/PostContext'
import PuppyProvider from './components/Context/PuppyContext'
import MenuContext from './components/Context/MenuContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostContextProvider> 
    <PuppyProvider>
    <MenuContext>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </MenuContext>
    </PuppyProvider>
    </PostContextProvider>
  )
}
