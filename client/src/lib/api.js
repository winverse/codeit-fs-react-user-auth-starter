import axios from "@/lib/axios";

export async function getMe() {
  const res = await axios.get("/users/me");
  return res.data;
}

export async function updateMe(formData) {
  const res = await axios.patch("/users/me", formData);
  return res.data;
}

export async function getMyLinks() {
  const res = await axios.get("/users/me/links");
  return res.data;
}

export async function getMyLink(linkId) {
  const res = await axios.get(`/users/me/links/${linkId}`);
  return res.data;
}

export async function createMyLink({ title, url }) {
  const res = await axios.post("/users/me/links", { title, url });
  return res.data;
}

export async function updateMyLink(linkId, { title, url }) {
  const res = await axios.patch(`/users/me/links/${linkId}`, { title, url });
  return res.data;
}

export async function deleteMyLink(linkId) {
  const res = await axios.delete(`/users/me/links/${linkId}`);
  return res.data;
}

export async function getUser(userId) {
  const res = await axios.get(`/users/${userId}`);
  return res.data;
}

export async function getUserLinks(userId) {
  const res = await axios.get(`/users/${userId}/links`);
  return res.data;
}
