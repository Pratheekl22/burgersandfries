import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import React from 'react';

export default defineConfig({
  plugins: [ mkcert() ]
})