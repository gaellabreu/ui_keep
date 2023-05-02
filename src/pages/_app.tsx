import '../styles/globals.css'
import { ConfigProvider, theme } from 'antd'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Component {...pageProps} />
    </ConfigProvider>
  </SessionProvider>
}
