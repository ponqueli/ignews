import { GetServerSideProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

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
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

//tudo colocado aqui dentro é executado dentro do servidor node
export const getServerSideProps: GetServerSideProps = async () =>{

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

  return{
    props:{
      product
    }
  }
}
