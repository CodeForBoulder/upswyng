db.createUser({
  user: "upswyng-dev-user",
  pwd: "upswyng123",
  roles: [
    {
      role: "readWrite",
      db: "upswyng-dev",
    },
  ],
});
