import {
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import SidebarButtonContainer from "./components/SidebarButtonContainer";
import SidebarButton from "./components/SidebarButton";
import { NavigationContext } from "../../Context/NavigationContext";
import { options } from "../../Context/NavigationContext";
import Logo from "/temp-logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

// Motion wrapper para o Flex do Chakra
const MotionFlex = motion(Flex);

export const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true); // abre por padrão pra testar
  const { switchPage, CurrentPageProps } = useContext(NavigationContext);

  const SIDEBAR_WIDTH = 230;

  return (
    <>
      <IconButton
        aria-label="toggle-sidebar"
        onClick={() => setIsSideBarOpen((s) => !s)}
        width={"50px"}
        height={"50px"}
        position="fixed"
        bottom="20px"
        left="20px"
        zIndex={9999}
        icon={
          isSideBarOpen ? (
            <BiSolidLeftArrow></BiSolidLeftArrow>
          ) : (
            <BiSolidRightArrow></BiSolidRightArrow>
          )
        }
      />

      <AnimatePresence initial={false}>
        {isSideBarOpen && (
          <MotionFlex
            // animações usando transform (x)
            initial={{ x: -SIDEBAR_WIDTH }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_WIDTH }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            position="fixed" // fixed evita que quebre o fluxo da página
            top="0"
            left="0"
            height="100dvh"
            width={`${SIDEBAR_WIDTH}px`}
            flexDir="column"
            gap={2}
            backgroundColor="#f6f6f6"
            zIndex={900} // garante acima do conteúdo principal, se precisar ajuste
          >
            <Flex justifyContent={"center"} alignItems={"center"} height="80px">
              <Image src={Logo} alt="Logo" width="130px" objectFit="contain" />
            </Flex>

            {/* botão para fechar o sidebar (posicionado sobre a borda) */}

            <Flex flexDir={"column"}>
              <SidebarButtonContainer
                value={CurrentPageProps.page}
                onChange={switchPage}
              >
                {options.map((o, i) => (
                  <SidebarButton
                    defaultChecked={o.isDefault}
                    key={i}
                    value={o.page}
                  >
                    {o.title}
                  </SidebarButton>
                ))}
              </SidebarButtonContainer>
            </Flex>
          </MotionFlex>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
