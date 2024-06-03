/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4200',
                pathname: '/static/**'
            }
        ]
    }
};

export default nextConfig;
