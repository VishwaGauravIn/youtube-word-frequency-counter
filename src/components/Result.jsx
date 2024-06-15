import React from "react";
import { Eye } from "lucide-react";
import { Card } from "./ui/card";
import numFormatter from "js-num-prettier";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Result({ info }) {
  return (
    <section className="flex flex-col gap-10">
      <Card className="flex flex-col sm:flex-row p-4 max-w-2xl gap-4">
        <img
          src={info.videoDetails.thumbnail.thumbnails[0].url}
          alt=""
          className="rounded-sm sm:h-32 "
        />
        <div className="ml-1 sm:ml-0">
          <p className="font-medium">{info.videoDetails.title}</p>
          <p className="text-muted-foreground">{info.videoDetails.author}</p>
          <p className="flex items-center mt-1 text-muted-foreground">
            <Eye className="h-4 w-4 mr-1.5" />{" "}
            {numFormatter(info.videoDetails.viewCount, 2)} views
          </p>
        </div>
      </Card>
      <Command className="rounded-lg border shadow-md group">
        <CommandInput placeholder="Search a specific word..." />
        <CommandList className="h-0 group-focus-within:h-32 transition-all ease-in-out">
          <CommandEmpty>No results found.</CommandEmpty>
          {info.wordFrequency.map((word, i) => (
            <CommandItem key={i}>
              <p className="flex gap-2 items-center">
                {word.word}
                <span className="text-muted-foreground text-xs">
                  ({word.frequency} times)
                </span>
              </p>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
      <p className="-mb-4 text-center text-xl tracking-wide">
        Words with highest occurence:
      </p>
      <Card className="pb-4">
        <Table>
          <TableCaption>Top 10 words with highest occurence</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Word</TableHead>
              <TableHead className="text-right">Occurence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {info.wordFrequency.slice(0, 10).map((word, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{i + 1}.</TableCell>
                <TableCell>{word.word}</TableCell>
                <TableCell className="text-right">
                  {word.frequency} times
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
