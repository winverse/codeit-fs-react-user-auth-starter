"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import HorizontalRule from "@/components/HorizontalRule";
import Link from "@/components/Link";
import { useToaster } from "@/contexts/ToasterProvider";
import * as styles from "./RegisterPage.css.js";

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const router = useRouter();
  const toast = useToaster();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }
    const { name, email, password } = values;
    // TODO: 서버에 회원을 생성하고, 성공하면 로그인한 뒤 `/me`로 이동합니다.
  }

  return (
    <>
      <h1 className={styles.heading}>회원가입</h1>
      {/* TODO: 구글 로그인을 구현합니다. */}
      <Button
        className={styles.googleButton}
        type="button"
        appearance="outline"
      >
        <img src="/assets/google.svg" alt="Google" />
        구글로 시작하기
      </Button>
      <HorizontalRule className={styles.horizontalRule}>또는</HorizontalRule>
      <form onSubmit={handleSubmit}>
        <Label className={styles.label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.input}
          name="name"
          type="text"
          placeholder="김링크"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.input}
          name="email"
          type="email"
          placeholder="example@email.com"
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
        <Label className={styles.label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        <Button className={styles.button}>회원가입</Button>
        <div>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
