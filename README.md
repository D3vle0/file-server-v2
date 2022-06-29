# file-server-v2

나만의 CDN, 파일 공유 서비스입니다.

## 언제 사용하면 좋을까?

- 메신저에서 파일 전송 시 용량 제한을 직면했을 때
- 원본 화질의 영상을 전송하고 싶을 때
- 익명으로 클라우드에 파일 업로드를 하고 싶을 때
- USB 없이 로컬 네트워크 상에서 빠르게 파일을 공유하고 싶을 때

## 기능

- 폴더 별로 관리되는 관리자의 파일
- 익명으로 파일을 업로드 가능

## 설치

```sh
$ sudo npm i nodemon ts-node -g
$ git clone https://github.com/D3vle0/file-server-v2
$ cd file-server-v2
$ yarn
```

## 사용법

1. `/public` 디렉토리 아래에 `admin`, `user` 디렉토리를 만듭니다.
    ```sh
    $ mkdir ./public/admin; mkdir ./public/user
    ```
2. 관리자가 제공할 파일들을 `/public/admin` 아래에 여러 디렉토리로 분류합니다. (ex: `/public/admin/videos`, `/pubic/admin/codes` 등)
    ```sh
    $ mkdir ./public/admin/videos/; mkdir ./public/admin/codes; ...
    ```
3. 관리자 ID와 PW를 환경변수에 작성합니다.
    ```sh
    $ echo "ADMIN_ID=<관리자 ID>" > .env
    $ echo "ADMIN_PW=<관리자 PW>" >> .env
    ```
4. 작동을 원하는 포트 값을 환경변수에 작성합니다. (기본값 5000)
    ```sh
    $ echo "PORT=<포트 번호>" >> .env
    ```

## 실행

### Development

```sh
$ yarn dev
```

### Production

```sh
$ yarn build
$ yarn start
```
