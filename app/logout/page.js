'use client'; // '사용자가 보는 페이지'라는 뜻, Next.js 13버전부터 App Router에서 도입된 선언문

import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
    window.location.replace('/');
  }, []);

  return null;
}