"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import styles from "./AvatarInput.module.css";

function AvatarInput({ className, initialAvatar, name, onChange }) {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(initialAvatar);
  const inputRef = useRef();

  function handleChange(e) {
    const nextFile = e.target.files[0];
    setFile(nextFile);
    onChange(name, nextFile);
  }

  function handleUploadClick() {
    inputRef.current?.click();
  }

  useEffect(() => {
    if (!file) {
      setAvatar(initialAvatar);
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setAvatar(blobUrl);

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [file, initialAvatar]);

  return (
    <div className={`${styles.AvatarInput} ${className}`}>
      <Avatar size="large" src={avatar} alt="아바타 이미지 미리보기" />
      <Button
        type="button"
        className={styles.UploadButton}
        appearance="secondary"
        onClick={handleUploadClick}
      >
        <img src="/assets/upload.svg" alt="업로드" />
        사진 업로드
      </Button>
      <input
        className={styles.HiddenInput}
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
}

export default AvatarInput;
