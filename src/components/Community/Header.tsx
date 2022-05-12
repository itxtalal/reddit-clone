import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";

type CommunityHeaderProps = {
  communityData: Community;
};

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ communityData }) => {
  // read from community snipper
  const isJoined = false;
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityData.imageUrl ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="5px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              height="30px"
              pl={6}
              pr={6}
              onClick={() => {}}
              variant={isJoined ? "outline" : "solid"}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CommunityHeader;
