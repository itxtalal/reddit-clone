import React from "react";
import { Community } from "../../atoms/communitiesAtom";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts: React.FC<PostsProps> = () => {
  return <div>Have a good coding</div>;
};
export default Posts;
