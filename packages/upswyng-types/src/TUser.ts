export interface TUser {
  _id: string; // database ObjectId converted to hex string
  name?: string;
  email: string;
  providers: ("facebook" | "google" | "slack")[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}
