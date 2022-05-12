import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  createdAt?: Timestamp;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  imageUrl?: "string";
}
