/// <reference types="vite/client" />

declare module '*.svg' {
  import React from 'react';
  const content: string;
  export default content;
}
