import { AppProps } from 'next/app';
import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { Header } from '../components/Header';
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <NextAuthProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </NextAuthProvider>
  ) 
}

export default MyApp

//uma coisa que repete em todas as páginas. Igual o App do react.
//toda vez que o usuário troca de tela, ele vai ser recriado do zero.
//uma fonte externa não precisa ser colocado no app. é melhor colocar do _document
// o _document é renderizado apenas uma vez, independente de quantas páginas o usuário acessar.

