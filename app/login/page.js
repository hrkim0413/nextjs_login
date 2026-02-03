'use client'; // '사용자가 보는 페이지'라는 뜻, Next.js 13버전부터 App Router에서 도입된 선언문

import Link from 'next/link';
import { useState } from 'react';

const LoginPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('로그인 성공!');
      localStorage.setItem('token', data.token); // 토큰 저장

      // 메인페이지로 이동
      window.location.href = '/';
    } else {
      alert(data.message || '로그인 실패');
    }
  }

  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디</label>
          <input type="text" id='username' name='username' placeholder='아이디' required value={form.username} onChange={handleChange} />
        </p>
        <p>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id='password' name='password' placeholder='비밀번호' required value={form.password} onChange={handleChange} />
        </p>
        <p>
          <input type="submit" value="로그인" />
        </p>
        <p>
          <Link href={'/idsearch'}>아이디 찾기</Link>
          &nbsp; &#10072; &nbsp;
          <Link href={'/pwsearch'}>비밀번호 찾기</Link>
          &nbsp; &#10072; &nbsp;
          <Link href={'/register'}>회원가입</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;