"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUser, getUserLinks } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import HorizontalRule from "@/components/HorizontalRule";
import LinkCard from "@/components/LinkCard";
import * as styles from "./UserPage.css.js";

function UserPage() {
  const params = useParams();
  const userId = params.userId;

  const { data: user } = useQuery({
    queryKey: queryKeys.users.info(userId),
    queryFn: () => getUser(userId),
  });

  const { data: links = [] } = useQuery({
    queryKey: queryKeys.users.links(userId),
    queryFn: () => getUserLinks(userId),
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <header className={styles.header}>
        <Card className={styles.profile}>
          <Avatar src={user.avatar} alt="프로필 이미지" />
          <div className={styles.values}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
        </Card>
        <p className={styles.bio}>{user.bio}</p>
      </header>
      <HorizontalRule className={styles.horizontalRule} />
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard
              title={link.title}
              thumbUrl={link.thumbUrl}
              url={link.url}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPage;
