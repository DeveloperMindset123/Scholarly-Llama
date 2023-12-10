/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  //is a development mode only feature for highlighting potential problems in an application. It helps to identify unsafe lifecycles legacy API usage, and a number of other features (according to the documentation)
  swcMinify: true, //used for javascript minification
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  //added modifications starting here --> may not even be neccessary
  /*
  async redirects() {
    return [
      {
        source: '/',  //this is the incoming request path pattern
        destination: '/Login',  //should redirect user to the Login page upon typing npm run dev
        permanent: false,
      }
    ]
  }
*/
  
};

export default nextConfig;
