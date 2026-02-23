/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages project site (username.github.io/repo-name)
  // Use basePath: "" and assetPrefix: "" if deploying to username.github.io root
  basePath: process.env.NODE_ENV === "production" ? "/cleantext" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/cleantext/" : "",
}

export default nextConfig
