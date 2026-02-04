export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 폰트어썸 사용법 1. cdn 주소로 연결하여 사용 */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
        {/* 폰트어썸 사용법 2. npm i로 설치해서 사용 => react와 동일 */}
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}
