"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import AvatarInput from "@/components/AvatarInput";
import * as styles from "./SettingPage.css.js";

function SettingForm({ user }) {
  const [values, setValues] = useState({
    avatar: "",
    name: user.name,
    email: user.email,
    bio: user.bio ?? "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateMeMutation = useMutation({
    mutationFn: (formData) => updateMe(formData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.me.info() }),
  });

  function handleChange(name, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", values.avatar);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("bio", values.bio);
    updateMeMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/me");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <AvatarInput
        name="avatar"
        initialAvatar={user.avatar}
        className={styles.input}
        onChange={handleChange}
      />
      <Label className={styles.label} htmlFor="name">
        이름
      </Label>
      <Input
        id="name"
        className={styles.input}
        name="name"
        type="text"
        placeholder="이름"
        value={values.name}
        onChange={handleInputChange}
      />
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
        onChange={handleInputChange}
      />
      <Label className={styles.label} htmlFor="bio">
        내 링크 소개
      </Label>
      <TextArea
        id="bio"
        className={styles.textArea}
        name="bio"
        maxLength={64}
        placeholder="아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"
        value={values.bio}
        onChange={handleInputChange}
      />
      <Button className={styles.button}>적용하기</Button>
    </form>
  );
}

function SettingPage() {
  const { data: user } = useQuery({
    queryKey: queryKeys.me.info(),
    queryFn: () => getMe(),
  });

  return (
    <>
      <h1 className={styles.heading}>프로필 편집</h1>
      {user && <SettingForm user={user} />}
    </>
  );
}

export default SettingPage;
