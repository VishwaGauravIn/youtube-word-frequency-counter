import { Github, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar({ resetState }) {
  return (
    <nav className="flex justify-between items-center w-full p-6 gap-4">
      <div
        className="flex gap-2 justify-center items-center cursor-pointer"
        onClick={() => resetState()}
      >
        <Youtube className="h-10 w-10 stroke-[0.5]" />
        <span className="sm:block hidden">
          {" "}
          YouTube Word Frequency Analyzer
        </span>
      </div>
      <Link
        href="https://github.com/VishwaGauravIn/youtube-word-frequency-counter"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="outline">
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </Link>
    </nav>
  );
}
