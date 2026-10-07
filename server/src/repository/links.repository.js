import { db, now, save } from "#db/json-db.js";

function toPublicLink(link) {
  const { userId: _userId, ...publicLink } = link;
  return publicLink;
}

function findStoredLink(linkId) {
  return db.links.find((link) => link.id === Number(linkId));
}

async function findAllByUserId(userId) {
  const links = db.links.filter((link) => link.userId === Number(userId));
  return links.map(toPublicLink);
}

async function findByIdAndUserId(linkId, userId) {
  const link = findStoredLink(linkId);

  if (!link || link.userId !== Number(userId)) {
    return null;
  }

  return toPublicLink(link);
}

async function create(userId, { title, url }) {
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
  return toPublicLink(link);
}

async function update(linkId, data) {
  const link = findStoredLink(linkId);
  Object.assign(link, data, { updatedAt: now() });
  save();
  return toPublicLink(link);
}

async function remove(linkId) {
  db.links = db.links.filter((link) => link.id !== Number(linkId));
  save();
}

export const linksRepository = {
  findAllByUserId,
  findByIdAndUserId,
  create,
  update,
  remove,
};
