import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
  const { username, password } = await req.json();
  const SECRET_KEY = 'test';

  // db에 기존 가입자가 있는지 조회
  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  // 같은 아이디가 존재하지 않는다면 메세지 띄우기
  if (users.length === 0) {
    return new Response(JSON.stringify({ message: '존재하는 아이디가 없습니다.' }), { status: 404 })
  }

  // 같은 아이디가 존재한다면
  const user = users[0];

  // 비밀번호가 일치하는지 검사
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(JSON.stringify({ message: '비밀번호가 일치하지 않습니다. 다시 확인하세요.' }), { status: 401 })
  }

  // 아아디, 비밀번호가 맞으면 토큰 생성
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }), { status: 200 })
};