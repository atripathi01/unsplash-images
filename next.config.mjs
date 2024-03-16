/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
    env:{
        NEXT_APP_BASE_URL:process.env.NEXT_APP_BASE_URL,
        UNSPLASH_CLIENT_ID:process.env.UNSPLASH_CLIENT_ID,
    },

};

export default {
    ...nextConfig,
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'], 
    images: {
        domains: ['images.unsplash.com'],
      },
    
};