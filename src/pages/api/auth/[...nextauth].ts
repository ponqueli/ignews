import NextAuth from "next-auth"; //(social, gmail, github, twitter, facebook)
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  secret: process.env.SIGNIN_KEY,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
  
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      
      try{
        await fauna.query( //linguagem FQL
          q.If( //todo if do fauna é obrigado a ter um else
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email) //normaliza caso o usuario digite maiusculo ou minusculo
                )
              )
            ),
            q.Create(
              q.Collection("users"), //passar primeiro o nome da collection
              { data : { email }} //passar o objeto com os dados dentro do data
            ),
            q.Get( //select do fauna
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          )
        );
        return true;
      }catch(e){
        console.log(e);
        return false;
      }
    },
  },
})

// FaunaDB - HTTP (vamos usar)
// DynamoDB - AWS