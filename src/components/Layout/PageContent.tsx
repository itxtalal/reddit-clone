import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentProps = {
  children?: React.ReactNode[];
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("children", children);
  return (
    <Flex justify="center" padding="16px 0px" border="1px solid red">
      <Flex
        border="1px solid green"
        width="95%"
        maxWidth="860px"
        justify="center"
      >
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: "0", md: "6" }}
          border="1px solid blue"
        >
          {children && children[0]}
        </Flex>

        {/* RHS */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
          border="1px solid orange"
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
