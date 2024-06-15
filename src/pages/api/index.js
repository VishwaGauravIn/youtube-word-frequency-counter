// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const videoId = req.query.id;
  let info = await ytdl.getInfo(videoId);
  let captionUrl =
    info.player_response.captions.playerCaptionsTracklistRenderer
      .captionTracks[0].baseUrl;
  let videoDetails = info.player_response.videoDetails;

  const XMLCaptions = (await axios.get(captionUrl)).data;

  res.status(200).json({
    videoDetails: videoDetails,
    XMLCaptions: XMLCaptions,
  });
}
