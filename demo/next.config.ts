import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['use-country-list-zh', 'antd', '@ant-design/icons'],
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
