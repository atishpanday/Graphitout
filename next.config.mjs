/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProd ? '/Graphitout' : '',
    assetPrefix: isProd ? '/Graphitout/' : '',
    trailingSlash: true,
    output: 'export',
};

export default nextConfig;
