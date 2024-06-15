import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export default function Search({ url, setUrl, handleSubmit }) {
  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-2xl">
      <form
        className="ml-auto flex-1 sm:flex-initial relative w-full"
        onSubmit={handleSubmit}
      >
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Enter YouTube video URL.."
          className="pl-14 w-full h-14 outline-none"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </form>
    </section>
  );
}
