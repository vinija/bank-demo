/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    TAVILY_API_KEY: process.env.TAVILY_API_KEY,
    NEXT_PUBLIC_COPILOTKIT_URL: process.env.COPILOTKIT_URL,
  },
};

export default nextConfig;
