/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: 'mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=',
        NEXTAUTH_URL: 'http://localhost:3000/',
        WEBSERVICE_URL: 'http://localhost:8000/'
    },
}

module.exports = nextConfig
