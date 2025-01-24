import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: Record<string, string>) {
        const { userId } = credentials;
        return {
          id: userId
        };
      }
    })
  ],

  callbacks: {
    async signIn({ user }) {
      const { id } = user;
      if (user && id) {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      return { ...session, token: token.id };
    }
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login'
  }
});
