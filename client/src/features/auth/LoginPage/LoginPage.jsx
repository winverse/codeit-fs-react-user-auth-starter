"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { HorizontalRule } from "@/components/HorizontalRule";
import { Link } from "@/components/Link";
import * as styles from "./LoginPage.css.js";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: 서버에 로그인을 시도하고, 성공하면 `/me`로 이동합니다.
  }

  return (
    <>
      <h1 className={styles.heading}>로그인</h1>
      <form onSubmit={handleSubmit}>
        <Label className={styles.label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.button}>로그인</Button>
        <HorizontalRule className={styles.horizontalRule}>또는</HorizontalRule>
        {/* TODO: 구글 로그인을 구현합니다. */}
        <Button
          className={styles.googleButton}
          type="button"
          appearance="outline"
        >
          <img src="/assets/google.svg" alt="Google" />
          구글로 시작하기
        </Button>
        <div>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
