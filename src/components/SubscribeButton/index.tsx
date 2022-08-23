import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

// 3 lugares seguros para fazer um checkout por exemplo
// getServerSideProps (SSR)=> quando a página está sendo renderizada
// getStaticprops (SSG) => quando a página está sendo renderizada
// API routes (acao através de um clique do usuário)

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { status } = useSession(); 
  
  async function handleSubscribe(){
    if(status === "authenticated"){
      try {
        const response = await api.post('/subscribe');

        const { sessionId } = response.data;

        const stripe = await getStripeJs();

        await stripe.redirectToCheckout({ sessionId });

      } catch (error) {
        alert(error.message);
      }
    }else{
      signIn('github');
      return;
    }
  }

  return(
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}