export const queryKeys = {
  me: {
    all: () => ["me"],
    info: () => ["me", "info"],
    links: () => ["me", "links"],
    link: (linkId) => ["me", "links", linkId],
  },
  users: {
    info: (userId) => ["users", userId],
    links: (userId) => ["users", userId, "links"],
  },
};
