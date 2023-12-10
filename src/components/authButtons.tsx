"use client"
import { signIn, signOut } from "next-auth/react";
import '@/app/globals.css';
import Link from "next/link";

export const LoginButton = () => {
  return (
    <a className="px-3 py-1 mx-2 rounded-md dark:bg-blue-600 shadow text-center dark:hover:bg-blue-500" href="/api/auth/signin">
      Sign in
    </a>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
