import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
		name: "Credentials",
		credentials: {
			username: { label: "Usernamme", type: "text" },
			password: { label: "Password", type: "password" },
		},
		async authorize(credentials, req) {
      const res = await fetch(`${process.env.WEBSERVICE_URL}api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: credentials?.username,
          password: credentials?.password
        })
			});

			const user = await res.json();

			if (res.ok) {	
				return user;
			} else {
				return null;
			}
		},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
		  return { ...token, ...user };
		},
		async session({ session, token, user }) {
		  session.user = token as any;
		  return session;
		},
	},
	pages: {
		signIn: '/auth/signIn',
		error: '/auth/error'
	}
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };