/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ttchtxjdrpyecnfmstjb.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/Cabins-images/**',
          },
        ],
      },
      // output : "export"  for stitc page
};

export default nextConfig;
