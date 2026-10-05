"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getMyLink, updateMyLink } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as styles from "./EditLinkPage.css.js";

function EditLinkForm({ linkId, link }) {
  const [values, setValues] = useState({
    title: link.title,
    url: link.url,
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateLinkMutation = useMutation({
    mutationFn: (newLink) => updateMyLink(linkId, newLink),
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
    updateLinkMutation.mutate(
      { title, url },
      {
        onSuccess: () => {
          router.push("/me");
        },
      },
    );
  }

  return (
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
      <Button className={styles.button}>적용하기</Button>
    </form>
  );
}

function EditLinkPage() {
  const params = useParams();
  const linkId = params.linkId;

  const { data: link } = useQuery({
    queryKey: queryKeys.me.link(linkId),
    queryFn: () => getMyLink(linkId),
  });

  return (
    <>
      <h1 className={styles.heading}>링크 편집</h1>
      {link && <EditLinkForm linkId={linkId} link={link} />}
    </>
  );
}

export default EditLinkPage;
