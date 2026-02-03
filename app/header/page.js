'use client'; // '사용자가 보는 페이지'라는 뜻, Next.js 13버전부터 App Router에서 도입된 선언문

import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeaderPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [])

  return (
    <header>
      <h1>로고</h1>

      <nav>
        {
          isLoggedIn
            ?
            <Link href={'../logout'}>로그아웃</Link>
            :
            <>
              <Link href={'../login'}>로그인</Link>
              &nbsp; &#10072; &nbsp;
              <Link href={'../register'}>회원가입</Link>
            </>
        }
      </nav>
    </header>
  );
};

export default HeaderPage;