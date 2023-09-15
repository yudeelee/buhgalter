import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from 'next-auth/providers/twitter';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';
import db from '../../../../utils/db.js';
import User from '@/models/User';
import bcrypt from 'bcrypt';

db.connectDb();

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error('Невдала спраба входу.');
        }
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/user/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
});

export { handler as GET, handler as POST };

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password.');
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error('Email or password is wrong!');
  }
  return user;
};
