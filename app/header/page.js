'use client'; // '사용자가 보는 페이지'라는 뜻, Next.js 13버전부터 App Router에서 도입된 선언문

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeaderPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [])

  return (
    <>
      <header>
        <div className="inner">
          {
            isLoggedIn
              ?
              <Link href={'../logout'} title='로그아웃하기' className='log-btn logout-btn'><i className="fas fa-user"></i></Link>
              :
              <Link href={'../login'} title='로그인 페이지로 이동' className='log-btn login-btn'><i className="fas fa-user"></i></Link>
          }
          <h1>
            <Image
              src="/images/logo.png"
              alt="로고"
              width={237}
              height={50}
            />
          </h1>
          <button className='menu-btn' onClick={() => setNavToggle(prev => !prev)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>
      <nav className={navToggle ? 'act' : ''}>
        <div className="inner">
          <button className='close-btn' onClick={() => setNavToggle(prev => !prev)}>
            <i className="fas fa-times"></i>
          </button>
          <ul className='gnb'>
            <li>메뉴1</li>
            <li>메뉴2</li>
            <li>메뉴3</li>
            <li>메뉴4</li>
          </ul>
          <ul className="bt-menu">
            {
              isLoggedIn
                ?
                <>
                  <li>
                    <Link href={'../logout'} title='로그아웃하기' className='logout'>로그아웃</Link>
                  </li>
                </>
                :
                <>
                  <li>
                    <Link href={'../login'} title='로그인 페이지로 이동' className='login'>로그인</Link>
                  </li>
                  <li>
                    <Link href={'../register'} title='회원가입 페이지로 이동' className='join'>회원가입</Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </nav>
    </>
  );
};

export default HeaderPage;