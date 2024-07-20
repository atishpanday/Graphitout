/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    basePath: isProd ? "/Graphitout" : "",
    assetPrefix: isProd ? "/Graphitout" : "",
};

const nextConfig = {};

export default nextConfig;
