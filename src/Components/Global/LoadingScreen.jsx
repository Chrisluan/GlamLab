import React from "react";
import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
const shimmer = keyframes`
  0% { background-position: -500px 0 }
  100% { background-position: 500px 0 }
`;

const MotionBox = motion(Box);

const LoadingScreen = () => {
  return (
    <Flex
      height="100vh"
      width="100vw"
      bg="#FFF9F5"
      direction="column"
      justify="center"
      align="center"
      position="relative"
      overflow="hidden"
    >
      {/* Iluminação tipo camarim */}
      <Flex position="absolute" top="10%" gap={3}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} w="14px" h="14px" borderRadius="full" bg="#C8B58D" boxShadow="0 0 10px #C8B58D" />
        ))}
      </Flex>

      {/* Logo circular com brilho girando */}
      <MotionBox
        width="120px"
        height="120px"
        borderRadius="full"
        bgGradient="linear(to-br, #C7D1C8, #FFF9F5)"
        border="5px solid #C8B58D"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={6}
        boxShadow="0 0 40px rgba(200, 181, 141, 0.4)"
      >
        <Text color="#362B31" fontWeight="bold" fontSize="xl">GL</Text>
      </MotionBox>

      {/* Texto com brilho animado */}
      <Box
        bgGradient="linear(to-r, #362B31 20%, #C8B58D 50%, #362B31 80%)"
        bgClip="text"
        fontSize="xl"
        fontWeight="bold"
        animation={`${shimmer} 2s linear infinite`}
        backgroundSize="200% auto"
      >
        Preparando seu momento de beleza...
      </Box>
    </Flex>
  );
};

export default LoadingScreen;
