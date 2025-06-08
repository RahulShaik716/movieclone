"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../Button";
export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <button className="" onClick={() => signOut()}>
        Sign out
      </button>
    );
  }
  return (
    <button className="" onClick={() => signIn()}>
      Sign in
    </button>
  );
}
