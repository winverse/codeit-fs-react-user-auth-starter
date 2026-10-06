import { db, now, save } from "#db/json-db.js";

function findLinks(userId) {
  return db.links.filter((link) => link.userId === Number(userId));
}

function findLink(userId, linkId) {
  return db.links.find(
    (link) => link.userId === Number(userId) && link.id === Number(linkId),
  );
}

function createLink(userId, { title, url }) {
  const link = {
    id: db.nextLinkId++,
    userId: Number(userId),
    title,
    url,
    thumbUrl: null,
    createdAt: now(),
    updatedAt: now(),
  };
  db.links.push(link);
  save();
  return link;
}

function updateLink(link, values) {
  Object.assign(link, values, { updatedAt: now() });
  save();
  return link;
}

function deleteLink(link) {
  db.links = db.links.filter((item) => item !== link);
  save();
}

function toPublicLink(link) {
  const { userId, ...rest } = link;
  return rest;
}

export const linksRepository = {
  findLinks,
  findLink,
  createLink,
  updateLink,
  deleteLink,
  toPublicLink,
};
