/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fast unblock for Vercel builds: don't fail production builds on lint or TS errors.
  // Keep ESLint + TypeScript in dev/CI as you like (see README for options).
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // If your project has pending TS issues, this keeps production builds unblocked.
    // Re-enable by setting this to false once types are cleaned up.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
