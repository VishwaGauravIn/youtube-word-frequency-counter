// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const videoId = req.query.id;
  let info = await ytdl.getInfo(videoId);
  let captionUrl =
    info.player_response.captions.playerCaptionsTracklistRenderer
      .captionTracks[0].baseUrl;
  let videoDetails = info.player_response.videoDetails;

  // Set cache headers for 1 day (86400 seconds)
  res.setHeader("Cache-Control", "public, max-age=86400");

  res.json({
    videoDetails: videoDetails,
    captionUrl: captionUrl,
  });
}
