# 링크 공유 서비스 유저 기능 시작 코드

링크 공유 서비스에 회원가입, 로그인, 유저 데이터 관리, 로그인 상태에 따른 리다이렉트, 토큰 갱신, 로그아웃, 구글 로그인을 차례로 붙이는 프로젝트입니다. 교재를 따라 이 프로젝트 하나를 끝까지 고쳐 나갑니다.

## 폴더

| 폴더 | 역할 |
| --- | --- |
| `client/` | Next.js App Router로 만든 링크 공유 서비스 화면입니다. 교재를 따라 주로 고치는 곳입니다. |
| `server/` | 회원가입·로그인·토큰 갱신·로그아웃·링크 API를 제공하는 Express 서버입니다. 실행만 하고 고치지 않습니다. 데이터는 `server/data/db.json`, 업로드한 아바타는 `server/uploads/`에 저장됩니다. |

## 설치와 실행

Node.js 24 이상과 pnpm이 필요합니다. 터미널 두 개를 열어 서버와 화면을 각각 실행합니다.

```bash
# 터미널 1
cd server
pnpm install
pnpm dev

# 터미널 2
cd client
pnpm install
pnpm dev
```

- 터미널 1에 `서버가 http://localhost:3001에서 실행 중입니다.`가 출력됩니다. 브라우저에서 `http://localhost:3001/api`를 열면 `OK`가 보입니다.
- 브라우저에서 `http://localhost:3000`을 열면 `나의 링크들을 하나로 관리하세요.` 홈 화면이 보입니다.

## 처음 상태

- 화면(페이지 이동, 입력 폼)과 스타일은 모두 제공됩니다. 스타일은 vanilla-extract로 작성한 `*.css.js` 파일입니다.
- 마이 페이지, 링크 추가·수정·삭제, 프로필 편집, 유저 페이지의 요청 코드는 React Query로 작성되어 있습니다. 서버를 부르는 함수는 `client/src/lib/api.js`, 쿼리 키는 `client/src/lib/queryKeys.js`에 모여 있고, `QueryClientProvider`는 `client/src/components/Providers/Providers.jsx`에 등록되어 있습니다.
- 회원가입, 로그인, 상단 메뉴의 유저 정보, 로그아웃, 구글로 시작하기 버튼은 아직 동작하지 않습니다. 해당 자리에는 `TODO` 주석이 있습니다.
- 로그인하지 않은 상태라 `/me`(마이 페이지)는 빈 화면입니다.

## 주로 고치는 파일

| 파일 | 내용 |
| --- | --- |
| `client/src/lib/api.js` | 서버 요청 함수(회원가입·로그인·로그아웃 함수 추가) |
| `client/src/features/auth/RegisterPage/RegisterPage.jsx` | 회원가입 |
| `client/src/features/auth/LoginPage/LoginPage.jsx` | 로그인 |
| `client/src/lib/axios.js` | 요청 기본 설정, 토큰 갱신 |
| `client/src/contexts/AuthProvider.jsx` | 유저 데이터 관리(교재에서 새로 만듦) |
| `client/src/components/Providers/Providers.jsx`, `client/src/components/Nav/Nav.jsx` | `AuthProvider` 등록, 상단 메뉴 |
| `client/src/features/*/*Page/*Page.jsx` | 로그인 상태에 따른 리다이렉트 |
| `client/next.config.mjs` | 구글 로그인을 위한 프록시 설정 |

## 구글 로그인

구글 로그인 단계에서는 Google Cloud에서 발급한 값을 `server/env/.env.development`에 넣습니다. `server/env/.env.example`을 복사해 `server/env/.env.development`를 만들고 값을 채웁니다. 이 파일은 Git에 올라가지 않습니다.

```text
GOOGLE_CLIENT_ID=발급받은 클라이언트 ID
GOOGLE_CLIENT_SECRET=발급받은 클라이언트 보안 비밀번호
```
