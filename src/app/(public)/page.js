"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-10">
      <Button>
        {" "}
        <Link href={"/user/user-register"}>User Register</Link>{" "}
      </Button>
      <Button className="bg-black text-white hover:bg-pink-500">
        {" "}
        <Link href={"/bighil/bighil-login"}>Bighil Login</Link>{" "}
      </Button>
      <Button className="bg-red-600 text-white hover:bg-pink-500">
        {" "}
        <Link href={"/client/client-login"}>Client Login</Link>{" "}
      </Button>
      <div>
        <h1> This is demo website for Bighil</h1>
        <p>Hello World</p>
      </div>
    </div>
  );
}
