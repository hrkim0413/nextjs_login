'use client'; // '사용자가 보는 페이지'라는 뜻, Next.js 13버전부터 App Router에서 도입된 선언문

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form), // form객체를 json문자열로 변환하여 전송을 한다
    });

    let data = {};
    try { // 통신이 성공하면
      data = await res.json();
    } catch { // 실패하면
      data = { message: '서버 응답이 올바르지 않습니다.' }
    }
    if (res.ok) { // 응답이 정상일 경우
      alert('회원가입이 완료되었습니다.');
      setForm({
        username: '',
        password: ''
      })
      router.push('/');
    } else { // 응답이 정상이 아닐 경우(실패일 경우)
      alert(data.message);
    }
  }

  return (
    <section>
      <h2>회원가입</h2>

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
          <input type="submit" value="가입하기" />
          &nbsp; &#10072; &nbsp;
          <Link href={'/'}>홈으로</Link>
          &nbsp; &#10072; &nbsp;
          <Link href={'/login'}>로그인</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;