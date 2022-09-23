import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

// Client-side rendering => nao precisa de indexação, info carregada através de uma ação do usuário, info que não tem necessidade de estar ali, 
// Server-side rendering => dados dinâmicos da sessao do usuário, contexto da requisicao(demora mais)
// Static-Site-Generation => html compartilhado com todas pessoas (home blog, pag produto, iguais pra todo mundo)

// Post do Blob
// Conteúdo -> (SSG)
// Comentários -> (Client-side) Só depois que a página é carregada

interface HomeProps {
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  
  return (
    <>
      <Head>
        <title>Home | ig news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>
            News about <br/> 
            the <span> React</span> world
          </h1>
          <p> 
            Get access to all the publications <br/>
            for <span>{product.amount} monthly</span>
          </p>
          <SubscribeButton/>
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

//tudo colocado aqui dentro é executado dentro do servidor node
// export const getServerSideProps: GetServerSideProps = async () =>{

//   const price = await stripe.prices.retrieve("price_1LQd3uLFPxynCjDp6dZgMJNp",{
//     expand: ["product"]
//   });

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US',{
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100), //preço em centavos
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

//APENAS USAR QUANDO O CONTEÚDO FOR O MESMO PARA TODOS NA APLICAÇÃO
//apenas em páginas que podem ser estáticas (todo mundo verá essa página)
//mais performático que o getServerSideProps
//getServerSideProps mais dinâmico
export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve("price_1LQd3uLFPxynCjDp6dZgMJNp",{
    expand: ["product"]
  });

  const product ={
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), //preço em centavos
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //revalidate todos os dias = 24 horas, em segundos. Após esse tempo essa página estática é criada novamente
  }
}