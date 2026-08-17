import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                "curly-space-invention-7qrqrgrj99wcppr7-3000.app.github.dev",
                "localhost:3000",
            ],
        },
    },
};

export default nextConfig;
