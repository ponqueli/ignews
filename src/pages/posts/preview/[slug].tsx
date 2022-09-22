import {useEffect} from 'react';
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";
import { useRouter } from 'next/router';

interface PostPreviewProps {
  post: PostPreview
}

interface PostPreview {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className={`${styles.continueReading} ${styles.shakeHorizontal}`}>
          Wanna continue reading?
          <Link href="/">
            <a>Subscribe now 🤗</a>
          </Link>
        </div>
      </main>
     
    </>
  );
}

//só existe em página estática escrita com o colchete [slug].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [ 
     // { params: { slug: '5-advanced-react-patterns' } }
    ],
    fallback: 'blocking',
    // true (se alguem acessar o post q ainda nao foi acessada de forma estatica, carrega o conteudo pelo lado do cliente, no browser),
    // false (se o post nao for acessado de forma estatica retorna um 404 nao encontrado), não tenta buscar
    // blocking (tenta carregar na camada do next server side rendering e só quando tudo estiver carregado ele vai mostrar o conteudo)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 2)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  
  return {
    props: {
      post,
    },
    redirect: 60 * 30, // 30 minutes
  };
};
