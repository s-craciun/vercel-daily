export interface ISubscription {
  token: string;
  status: "active" | "inactive";
  subscribedAt: null | string;
  createdAt: string;
  updatedAt: string;
}
