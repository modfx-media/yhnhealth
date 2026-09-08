'use client';

import { useEffect } from 'react';

const REDIRECT_URL = 'https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2';
const REDIRECT_DELAY_MS = 3000; // 3 seconds

export default function AutoRedirect() {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(redirectTimer);
  }, []);

  return null;
}