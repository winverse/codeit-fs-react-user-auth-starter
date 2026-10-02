"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "@/components/Link";
import HorizontalRule from "@/components/HorizontalRule";
import LinkCard from "@/components/LinkCard";
import styles from "./MyPage.module.css";

function MyPage() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const router = useRouter();

  async function getMe() {
    const res = await axios.get("/users/me");
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function getMyLinks() {
    const res = await axios.get("/users/me/links");
    const nextLinks = res.data;
    setLinks(nextLinks);
  }

  function handleEditClick(linkId) {
    router.push(`/me/links/${linkId}/edit`);
  }

  async function handleDeleteClick(linkId) {
    await axios.delete(`/users/me/links/${linkId}`);
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
  }

  useEffect(() => {
    getMe();
    getMyLinks();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <header className={styles.Header}>
        <Card className={styles.Profile}>
          <Avatar src={user.avatar} alt="프로필 이미지" />
          <div className={styles.Values}>
            <div className={styles.Name}>{user.name}</div>
            <div className={styles.Email}>{user.email}</div>
          </div>
          <Button className={styles.EditButton} as={Link} href="/me/edit">
            편집
          </Button>
        </Card>
        <p className={styles.Bio}>
          {user.bio ??
            "아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"}
        </p>
      </header>
      <HorizontalRule className={styles.HorizontalRule} />
      <ul className={styles.LinkList}>
        {links.map((link) => (
          <li className={styles.LinkItem} key={link.id}>
            <LinkCard
              title={link.title}
              url={link.url}
              thumbUrl={link.thumbUrl}
              onClick={() => handleEditClick(link.id)}
              onDelete={() => handleDeleteClick(link.id)}
            />
          </li>
        ))}
        <li>
          <Link className={styles.CreateLink} href="/me/links/create">
            <img src="/assets/plus-square.svg" alt="더하기 아이콘" />
            링크 추가하기
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MyPage;
