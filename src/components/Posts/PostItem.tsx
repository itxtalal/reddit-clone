import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import {
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoArrowDownCircleSharp,
  IoArrowDownCircleOutline,
  IoBookmarkOutline,
  IoArrowRedoOutline,
} from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { Post } from "../../atoms/postAtom";
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const singlePostPage = !onSelectPost;
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // stops the click to reroute to post detail
    event.stopPropagation();
    setDeleteLoading(true);

    try {
      // await function always returns a Promise,
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error(`Failed to delete post ${post.id} ${post.title}`);
      }

      // console.log("✅ Post was successfully deleted.");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      setError(error.msg);
    }

    setDeleteLoading(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        background={singlePostPage ? "none" : "gray.100"}
        padding={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          cursor="pointer"
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>

        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, post, -1, post.communityId)}
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {/* Home Page Check */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    alt="Community Image"
                    borderRadius="full"
                    boxSize="18px"
                    mr={2}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize={18} mr={1} color="blue.500" />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => event.stopPropagation()}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" fontSize={10} />
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {imageLoading && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt="Post Image"
                maxHeight="460px"
                display={imageLoading ? "none" : "unset"}
                onLoad={() => setImageLoading(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize=" 9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize=" 9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize=" 9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {deleteLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize=" 9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
