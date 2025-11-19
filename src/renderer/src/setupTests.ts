import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Mock import.meta.env
Object.defineProperty(process, 'env', {
  value: {
    VITE_SUPABASE_URL: 'https://test.supabase.io',
    VITE_SUPABASE_ANON_KEY: 'anon-key'
  }
});
