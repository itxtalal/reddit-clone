import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import About from "../../../components/Community/About";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  // const communityStateValue = useRecoilValue(communityState);
  // console.log(
  //   "🚀 ~ file: submit.tsx ~ line 13 ~ communityStateValue",
  //   communityStateValue
  // );

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderBottomColor="white">
          <Text>Create a Post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
