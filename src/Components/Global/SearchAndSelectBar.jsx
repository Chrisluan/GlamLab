import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  InputGroup,
  Flex,
  Portal,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useModal } from "../../Context/ModalsContext";
export const SearchAndSelectBar = ({ list, onChange }) => {
  const { openCreateClientModal } = useModal();
  const [filteredList, setFilteredList] = useState(list);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef();
  useEffect(() => {
    setFilteredList(
      searchKeyword.length === 0
        ? list
        : list.filter((client) =>
            client.name.toLowerCase().includes(searchKeyword.toLowerCase())
          )
    );
  }, [searchKeyword, list]);

  useEffect(() => {
    if (isSearching && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isSearching]);

  return (
    <Flex>
      <InputGroup flexDir="column">
        <Input
          ref={inputRef}
          placeholder="Procurar"
          value={searchKeyword}
          onFocus={() => setIsSearching(true)}
          onBlur={async () => 
            await setTimeout(() => {
              setIsSearching(false);
            }, 200)
          }
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </InputGroup>

      {isSearching && (
        <Portal>
          <Flex
            position="absolute"
            flexDir="column"
            zIndex={999999}
            top={dropdownPos.top + "px"}
            left={dropdownPos.left + "px"}
            width={dropdownPos.width + "px"}
            backgroundColor="brand.200"
            padding={2}
          >
            <Flex
              flexDir="column"
              maxHeight="200px"
              overflowY={"auto"}
              borderRadius="md"
              gap={2}
            >
              {filteredList.length > 0 ? (
                filteredList.map((client) => (
                  <Box
                    key={client._id}
                    sx={{
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      justifyContent: "flex-start",
                      fontSize: "sm",
                      borderRadius: "0",
                      padding: "10px 15px",
                      backgroundColor: "brand.100",
                    }}
                    onClick={() => {
                      if (onChange) {
                        onChange({
                          target: {
                            name: "client",
                            value: JSON.stringify(client),
                          },
                        });
                      }
                      setSearchKeyword(client.name);
                      setIsSearching(false);
                    }}
                  >
                    {client.name}
                  </Box>
                ))
              ) : (
                <span style={{ color: "" }}>Nenhum cliente encontrado</span>
              )}
            </Flex>
            <Button
              variant={"solid"}
              sx={{
                fontSize: "sm",
                mt: 1,
              }}
              onClick={() => {
                openCreateClientModal();
                setIsSearching(false);
              }}
            >
              Novo cliente
            </Button>
          </Flex>
        </Portal>
      )}
    </Flex>
  );
};
