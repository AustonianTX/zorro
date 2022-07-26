export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface UserDetails {
  id: string /* primary key */;
  username: string;
  website?: string;
  fullName?: string;
  avatarUrl?: string;
}
