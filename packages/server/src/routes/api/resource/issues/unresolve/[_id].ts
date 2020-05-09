import { setResolved } from "../_setResolved";

/**
 * API endpoint to set a `ResourceIssue`'s `resolved` field to `false`.
 */
export async function post(req, res, next) {
  return await setResolved(false, req, res, next);
}
