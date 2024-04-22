export const videoUrlToThumbnailURl = (videoUrl: string) => {
  const videoId = new URLSearchParams(new URL(videoUrl).search).get('v');
  return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
};
