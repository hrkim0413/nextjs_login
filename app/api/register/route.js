import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const POST = async (req) => {
  const { username, password } = await req.json();

  // 넘겨받은 데이터가 있는지/없는지 유효성 검사를 함
  if (!username || !password) {
    return new Response(JSON.stringify({ message: '필수 항목 누락' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  // 서버(api/register)에서 항상 JSON 응답을 반환하도록 설정해야 합니다.
  // Response 객체를 생성시 반드시 JSON.stringify(...)와 headers: { 'Content-Type': 'application/json' }를 포함해야 함

  // 넘겨받은 데이터가 일치하는게 있는지 확인
  const [existing] = await db.query(
    'SELECT * FROM users WHERE username=?',
    [username]
  );

  if (existing.length > 0) {
    return new Response(JSON.stringify({ message: '이미 사용중인 아이디입니다.' }), {
      status: 409,
      headers: { 'Content-Type': 'application/JSON' }
    });
  }

  // 일치하는 데이터가 없다면 쿼리문으로 데이터 입력하여 회원정보를 추가
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );

  // http 응답 설정
  return new Response(
    JSON.stringify({ message: '회원가입이 완료되었습니다.' }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/JSON' }
    }
  )
}
