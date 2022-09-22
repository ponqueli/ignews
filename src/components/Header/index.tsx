import { useRouter } from "next/router";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  const { asPath } = useRouter();
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* imagens sempre na pasta public */}
        <img src="/images/logo.svg" alt="logo" />
        <nav>
        <ActiveLink activeClassName={styles.active} href="/">
          <a className={asPath==='/' ? styles.active : ''}>Home</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
          <a className={asPath==='/posts' ? styles.active : ''}>Posts</a>
        </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}