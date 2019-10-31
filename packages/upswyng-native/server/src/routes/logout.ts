import redirect from "@polka/redirect";

export function get(req, res, _next) {
  req.session.destroy((e: Error | null) => {
    if (e) {
      console.log("Error destroying session:\n", e);
    }
  });
  redirect(res, "/");
}
