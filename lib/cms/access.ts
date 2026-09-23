import type { Access, PayloadRequest } from "payload";

export const isLoggedIn = ({ req }: { req: PayloadRequest }): boolean => Boolean(req.user);

export const authenticated: Access = ({ req: { user } }) => Boolean(user);

export const anyone: Access = () => true;

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
