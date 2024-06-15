import React from "react";
import { Card } from "./ui/card";
import { Check, Clock, DollarSign, Languages } from "lucide-react";

export default function Landing({ setURL, getResult }) {
  function handleClick(id) {
    setURL("https://www.youtube.com/watch?v=" + id);
    getResult("https://www.youtube.com/watch?v=" + id);
  }

  function videoCard({ title, duration, id, imgID }) {
    return (
      <Card
        className="flex-1 border rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all ease-in-out duration-300 self-center min-h-64 max-w-sm sm:max-w-full"
        onClick={() => {
          handleClick(id);
        }}
      >
        <img
          src={`/${imgID}.webp`}
          alt=""
          className="rounded-t-sm hover:scale-110 transition-all ease-in-out duration-300 w-full"
        />
        <div className="w-full h-4 z-10 bg-white relative" />
        <div className="p-3 -mt-4">
          <p className="text-center flex flex-col items-center justify-center gap-2">
            {title}
            <span className="text-muted-foreground flex items-center justify-center text-sm">
              <Clock className="h-4 w-4 mr-1.5" />
              {duration}
            </span>
          </p>
        </div>
      </Card>
    );
  }
  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      <div className="text-center flex flex-col gap-4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Discover What YouTubers Say the Most
        </h1>
        <h2 className="text-sm sm:text-base text-muted-foreground">
          Discover the Most Frequent Words in YouTube Videos, Word Frequency
          Analyzer for YouTube.
        </h2>
      </div>
      <div className="flex flex-wrap self-center justify-center items-center gap-4 px-2 text-sm sm">
        <div className="flex justify-center items-center gap-2">
          <Languages className="h-6 w-6 text-green-500 stroke-[1]" />
          Supports All languages
        </div>
        <div className="flex justify-center items-center gap-2">
          <Check className="h-6 w-6 text-green-500 stroke-[1]" />
          Supports 99.99% Videos
        </div>
        <div className="flex justify-center items-center gap-2">
          <DollarSign className="h-6 w-6 text-green-500 stroke-[1]" />
          100% Free to use
        </div>
      </div>
      <p className="self-center text-2xl font-semibold opacity-75">
        Try with these Videos
      </p>
      <div className="flex gap-6 w-full px-4 flex-col sm:flex-row relative">
        {/* 1 */}
        {videoCard({
          title: "Joe Rogan & Elon Musk - Are We in a Simulated Reality?",
          duration: "15:02",
          id: "0cM690CKArQ",
          imgID: "1",
        })}
        {/* 2 */}
        {videoCard({
          title: "MrBeast Gets Flagrant and Walked Away from $1 BILLION",
          duration: "2:44:30",
          id: "WGrk7Mzm4uo",
          imgID: "2",
        })}
        {/* 3 */}
        {videoCard({
          title: "The Hunt for the King of the Dark Web",
          duration: "18:50",
          id: "gq01C2kjMiM",
          imgID: "3",
        })}
      </div>
    </div>
  );
}
