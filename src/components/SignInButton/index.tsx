import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton(){
  const { data: session, status } = useSession();
  
  return status  === "authenticated" ? (
    <button 
      type="button"
      className={styles.signInButton}
    >
      <FaGithub color="var(--green-500)"/>
      {session.user.name}
      <FiX 
        color="var(--gray-500)" 
        className={styles.closeIcon}
        onClick={() => signOut()}
      />
    </button>  
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="var(--yellow-500)"/>
      Sign in with Github
    </button>  
  );
}