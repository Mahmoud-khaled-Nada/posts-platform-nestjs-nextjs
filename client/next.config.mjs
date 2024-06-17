/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            // {
            //     source: '/',
            //     destination: '/home',
            // },
            // {
            //     source: '/profile',
            //     destination: '/profile',
            // },
        ];
    },
    env: {
        SERVER_API_URL: 'http://localhost:7000/api',
        APP_WEBSOCKET_URL: 'http://localhost:7000'
    },
};

export default nextConfig;