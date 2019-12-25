export interface TUser {
  id: string; // database ObjectId converted to hex string
  name?: string;
  email: string;
  providers: ("facebook" | "google")[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}
