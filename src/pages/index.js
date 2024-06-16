import CrispChat from "@/components/crisp";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import LoadingState from "@/components/LoadingState";
import Navbar from "@/components/Navbar";
import Result from "@/components/Result";
import Search from "@/components/Search";
import createWordFrequencyMap from "@/utils/createWordFrequencyMap";
import decodeHtmlEntities from "@/utils/decodeHtmlEntities";
import { getAlphaNumeric, getTextFromXML } from "@/utils/microUtils";
import axios from "axios";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
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
        .then(async (res) => {
          const XMLCaptions = (await axios.get(res.data.captionUrl)).data;
          info = {
            videoDetails: res.data.videoDetails,
            wordFrequency: createWordFrequencyMap(
              decodeHtmlEntities(getAlphaNumeric(getTextFromXML(XMLCaptions)))
            ),
          };
        })
        .catch((err) => {
          console.error(err);
          toast.error("An error occurred while fetching the video information");
        })
        .finally(() => setLoading(false));
      setInfo(info);
      if (typeof window !== "undefined") {
        if (isReady) {
          replace("/?url=" + videoURL);
        }
      }
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
          if (typeof window !== "undefined")
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
      <Head>
        <title>
          YouTube Word Counter: Discover What YouTubers Say the Most
        </title>
        <meta
          name="title"
          content="YouTube Word Counter: Discover What YouTubers Say the Most"
        />
        <meta
          name="description"
          content="Discover top words & catchphrases in YouTube videos! Analyze word frequency & understand creators' content deeper. Free YouTube word counter. Try now!"
        />
        <meta name="copyright" content="VishwaGauravIn" />
        <meta
          name="keywords"
          content="youtube, word frequency, analyze, video, content, creator, youtube word counter, analyze youtube videos, youtube vocabulary analysis, youtube catchphrase finder"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="ytword.itsvg.in" />
        <meta
          property="og:title"
          content="YouTube Word Counter: Discover What YouTubers Say the Most"
        />
        <meta
          property="og:description"
          content="Discover top words & catchphrases in YouTube videos! Analyze word frequency & understand creators' content deeper. Free YouTube word counter. Try now!"
        />
        <meta property="og:image" content="https://ytword.itsvg.in/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="ytword.itsvg.in" />
        <meta
          property="twitter:title"
          content="YouTube Word Counter: Discover What YouTubers Say the Most"
        />
        <meta
          property="twitter:description"
          content="Discover top words & catchphrases in YouTube videos! Analyze word frequency & understand creators' content deeper. Free YouTube word counter. Try now!"
        />
        <meta
          property="twitter:image"
          content="https://ytword.itsvg.in/og.png"
        />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NQMC7F3KM2"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NQMC7F3KM2', { page_path: window.location.pathname });
            `,
        }}
      />
      <main
        className={`flex min-h-screen flex-col items-center gap-10  ${inter.className}`}
      >
        <Navbar
          resetState={() => {
            setInfo(null);
            setUrl("");
            replace("/");
          }}
        />
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
      <CrispChat/>
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
