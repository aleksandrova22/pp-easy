import NextAuth, { NextAuthConfig } from "next-auth";
import type { ProviderType } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Vk from "next-auth/providers/vk";
import MailRu from "next-auth/providers/mailru";
import Yandex from "next-auth/providers/yandex";
import { repo, withRemult, type UserInfo } from "remult";
import bcrypt from "bcryptjs";
import { User } from "../../shared/entities/User";
import { Roles } from "../demo/auth/Roles";

// Configuration for Auth.js
const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        name: {
          type: "text", // The input field for username
          placeholder: "Helen", // Instructional placeholder for demo purposes  Try Jane or Steve
        },
        password: {
          type: "password", // The input field for password
          placeholder: " ", // Instructional placeholder for demo purposes  Jane123 or Steve123
        },
      },
      authorize: (credentials) =>
        // This function runs when a user tries to sign in
        withRemult(async () => {
          // The withRemult function provides the current Remult context (e.g., repository, authenticated user, etc.)
          // to any Remult-related operations inside this block. This ensures that `remult` functions such as
          // repository queries or checking user permissions can be executed correctly within the request's context.
          const user = await repo(User).findFirst({
            // Find a user by their name and provider type (credentials-based auth)
            name: credentials.name as string,
            providerType: "credentials",
          });
          //console.log('ggggggggggg  user', user)
          // If a matching user is found and the password is valid
          if (
            user &&
            bcrypt.compareSync(credentials.password as string, user.password)
          ) {
            return {
              id: user.id, // Return the user's ID as part of the session
              admin: user.admin
              // name1: "fff"
            };
          }
          return null; // If credentials are invalid, return null
        }),
    }),
    GitHub,
    Google,
    MailRu,
    Vk({
      clientId: process.env.AUTH_VK_ID,
      clientSecret: process.env.AUTH_VK_SECRET
    }),
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID,
      clientSecret: process.env.AUTH_YANDEX_SECRET
    }),
  ],
  callbacks: {

    jwt({ token, user }) {
      if (user) token.role = user.role;
      if (user)
        //console.log('____jwt', { token, user });
        if (user) {
          // token.id = user?.id;
          // token.role = user?.role;
          token.admin = user?.admin;
        }
      return token
    },



    signIn: (arg) =>
      withRemult(async () => {
        // This callback runs after sign-in
        if (arg.account?.type === "credentials") return true; // If credentials-based login, allow sign-in
        let user = await repo(User).upsert({
          where: {
            // Find the user by OAuth provider and account ID
            provider: arg.account?.provider,
            providerType: arg.account?.type,
            providerAccountId: arg.account?.providerAccountId,
          },
          set: {
            name: arg.profile?.name || "", // Update the user's name with the OAuth profile name
          },
        });
        arg.user!.id = user.id; // Set the user's ID in the session
        arg.user.admin = user?.admin;
        return true;
      }),
    session: ({ session, token }) => {
      // Add the user's ID to the session object
      // if (session?.user) {
      //   //session?.user?.id = token?.id;
      //  session.user.role = token?.role;
      // console.log('____session', { session, token });
      // }

      return {
        ...session,
        user: {
          id: token.sub, // Use the token's subject (user ID)
          name: session.user.name,
          admin: !!token?.admin,

          // role: session.user.role

        },
      };
    },
  },
};
// Auth.js middleware for Next.js
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export type { ProviderType }; // Export ProviderType for use in `User.providerType`
export async function getUserFromRequest(): Promise<UserInfo | undefined> {
  const session = await auth(); // Get the session from the request
  if (!session?.user?.id) return undefined; // If no session or user ID, return undefined
  const user = await repo(User).findId(session.user.id); // Find the user in the database by their session ID
  if (!user) return undefined; // If no user is found, return undefined
  return {
    id: user.id,
    name: user.name,
    roles: user.admin ? [Roles.admin] : [], // Return roles based on admin status
  };
}
