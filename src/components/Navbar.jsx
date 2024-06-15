import { Github, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center w-full p-6 gap-4">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <Youtube className="h-10 w-10 stroke-[0.5]" /> YouTube Word Frequency
        Counter
      </Link>
      <Button variant="outline">
        <Github className="mr-2 h-4 w-4" /> GitHub
      </Button>
    </nav>
  );
}
