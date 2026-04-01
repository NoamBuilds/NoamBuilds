import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      // Clean shareable links → NudgeMe waitlist with UTM tracking
      { source: "/nudgeme", destination: "/apps/nudgeme", permanent: false },
      { source: "/nudgeme/linkedin", destination: "/apps/nudgeme?utm_source=linkedin&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/instagram", destination: "/apps/nudgeme?utm_source=instagram&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/reddit", destination: "/apps/nudgeme?utm_source=reddit&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/twitter", destination: "/apps/nudgeme?utm_source=twitter&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/youtube", destination: "/apps/nudgeme?utm_source=youtube&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/tiktok", destination: "/apps/nudgeme?utm_source=tiktok&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/producthunt", destination: "/apps/nudgeme?utm_source=producthunt&utm_medium=social&utm_campaign=launch", permanent: false },
      { source: "/nudgeme/friends", destination: "/apps/nudgeme?utm_source=friends&utm_medium=referral&utm_campaign=word-of-mouth", permanent: false },
    ];
  },
};

export default nextConfig;
