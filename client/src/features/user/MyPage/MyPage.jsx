"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteMyLink, getMe, getMyLinks } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Link } from "@/components/Link";
import { HorizontalRule } from "@/components/HorizontalRule";
import { LinkCard } from "@/components/LinkCard";
import * as styles from "./MyPage.css.js";

function MyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: queryKeys.me.info(),
    queryFn: () => getMe(),
  });

  const { data: links = [] } = useQuery({
    queryKey: queryKeys.me.links(),
    queryFn: () => getMyLinks(),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (linkId) => deleteMyLink(linkId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.me.links() }),
  });

  function handleEditClick(linkId) {
    router.push(`/me/links/${linkId}/edit`);
  }

  function handleDeleteClick(linkId) {
    deleteLinkMutation.mutate(linkId);
  }

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
          <Button className={styles.editButton} as={Link} href="/me/edit">
            편집
          </Button>
        </Card>
        <p className={styles.bio}>
          {user.bio ??
            "아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"}
        </p>
      </header>
      <HorizontalRule className={styles.horizontalRule} />
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.id}>
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
          <Link className={styles.createLink} href="/me/links/create">
            <img src="/assets/plus-square.svg" alt="더하기 아이콘" />
            링크 추가하기
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MyPage;
