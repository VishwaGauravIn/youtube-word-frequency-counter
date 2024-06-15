import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import LoadingState from "@/components/LoadingState";
import Navbar from "@/components/Navbar";
import Result from "@/components/Result";
import Search from "@/components/Search";
import createWordFrequencyMap from "@/utils/createWordFrequencyMap";
import decodeHtmlEntities from "@/utils/decodeHtmlEntities";
import { getTextFromXML } from "@/utils/microUtils";
import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import ytdl from "ytdl-core";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ query }) {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isReady, replace } = useRouter();

  async function handleSubmit(e) {
    e?.preventDefault();
    getResult(url);
  }

  async function getResult(videoURL) {
    if (ytdl.validateURL(videoURL)) {
      setLoading(true);
      setInfo(null);
      const videoID = ytdl.getVideoID(videoURL);
      let info;
      await axios
        .get(`/api?id=${videoID}`)
        .then(
          (res) =>
            (info = {
              videoDetails: res.data.videoDetails,
              wordFrequency: createWordFrequencyMap(
                decodeHtmlEntities(getTextFromXML(res.data.XMLCaptions))
              ),
            })
        )
        .catch((err) => {
          // console.error(err);
          toast.error("An error occurred while fetching the video information");
        })
        .finally(() => setLoading(false));
      setInfo(info);
      replace("/?url=" + url);
    } else {
      toast.error("Invalid YouTube video URL");
    }
  }

  useState(() => {
    if (query?.url) {
      if (ytdl.validateURL(query.url)) {
        setUrl(query.url);
        getResult(query.url);
      } else {
        setTimeout(() => {
          if (isReady) {
            replace("/");
            toast.error("Invalid YouTube video link in URL");
          }
        }, 1000);
      }
    }
  }, []);

  return (
    <>
      <main
        className={`flex min-h-screen flex-col items-center gap-10  ${inter.className}`}
      >
        <Navbar />
        <Search
          handleSubmit={handleSubmit}
          url={url}
          setUrl={setUrl}
          loading={loading}
        />
        {loading && <LoadingState />}
        {!loading &&
          (info ? (
            <Result info={info} />
          ) : (
            <Landing setURL={setUrl} getResult={getResult} />
          ))}
        <Footer />
      </main>
      <Toaster richColors position="top-center" />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
