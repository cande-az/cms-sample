import { EditorContextProvider } from '@/context/editor'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/pages/editor/editor.scss'

export default function App({ Component, pageProps }: AppProps) {
  return  <EditorContextProvider><Component {...pageProps} /></EditorContextProvider>
}
