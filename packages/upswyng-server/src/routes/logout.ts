/**
 * API route used to destroy current session and therefore log user out of UpSwyng
 */
export function get(req, res, _next) {
  req.session.destroy((e: Error | null) => {
    if (e) {
      console.log("Error destroying session:\n", e);
    }
    res.redirect(302, "/?loggedout=true"); // use temporary redirect to prevent caching
  });
}
