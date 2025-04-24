import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.guim.co.uk",
                port: "",
                pathname: "/**",
            }
        ],
    },
    async redirects() {
        return [
            {
                source: "/messages",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
