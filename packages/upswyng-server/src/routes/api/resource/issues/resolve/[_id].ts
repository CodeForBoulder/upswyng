import { setResolved } from "../_setResolved";

/**
 * API endpoint to set a `ResourceIssue`'s `resolved` field to `true`.
 */
export async function post(req, res, next) {
  return await setResolved(true, req, res, next);
}
