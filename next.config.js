module.exports = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_APP_URL // Proxy to Backend
      },
    ];
  },
};
