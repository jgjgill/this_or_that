```
npm install
npm run start:dev
```

.env
```
SESSION_SECRET=세션암호
JWT_SECRET=JWT암호
DATABASE_URL=mysql://아이디:비밀번호@DB주소/이름
CLIENT_URL=클라이언트주소
LOGIN_URL=https://accounts.google.com/o/oauth2/v2/auth?client_id={클라이언트ID}&response_type=token&redirect_uri={리다이렉트주소}&scope=https://www.googleapis.com/auth/userinfo.email
GOOGLE_OAUTH_CLIENT_ID=구글클라이언트ID
GOOGLE_OAUTH_OAUTH_CLIENT_SECRET=구글클라이언트보안비밀
BASE_URL=백엔드주소
```