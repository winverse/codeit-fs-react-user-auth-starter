"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createMyLink } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as styles from "./CreateLinkPage.css.js";

function CreateLinkPage() {
  const [values, setValues] = useState({
    title: "",
    url: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const createLinkMutation = useMutation({
    mutationFn: (newLink) => createMyLink(newLink),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.me.links() }),
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, url } = values;
    createLinkMutation.mutate(
      { title, url },
      {
        onSuccess: () => {
          router.push("/me");
        },
      },
    );
  }

  return (
    <>
      <h1 className={styles.heading}>링크 추가</h1>
      <form onSubmit={handleSubmit}>
        <Label className={styles.label} htmlFor="title">
          사이트 이름
        </Label>
        <Input
          id="title"
          className={styles.input}
          name="title"
          type="text"
          placeholder="사이트 이름"
          value={values.title}
          onChange={handleChange}
        />
        <Label className={styles.label} htmlFor="url">
          링크
        </Label>
        <Input
          id="url"
          className={styles.input}
          name="url"
          type="text"
          placeholder="https://www.example.com"
          value={values.url}
          onChange={handleChange}
        />
        <Button className={styles.button}>등록하기</Button>
      </form>
    </>
  );
}

export default CreateLinkPage;
