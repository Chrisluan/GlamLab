import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  InputGroup,
  Flex,
  Portal,
  Button,
  Text,
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
          >
            <Flex
              border="1px solid #ccc"
              backgroundColor="brand.200"
              flexDir="column"
              maxHeight="200px"
              p={2}
              borderRadius="md"
            >
              {filteredList.length > 0 ? (
                filteredList.map((client) => (
                  <Button
                    key={client._id}
                    onClick={() => {
                      setSearchKeyword(client.name);
                      setIsSearching(false);

                      // Aqui simulamos o mesmo formato que seu HandleFormChanges espera
                      if (onChange) {
                        onChange({
                          target: {
                            name: "client",
                            value: JSON.stringify(client),
                          },
                        });
                      }
                    }}
                  >
                    {client.name}
                  </Button>
                ))
              ) : (
                <span style={{ color: "white" }}>
                  Nenhum cliente encontrado
                </span>
              )}
              
            </Flex>
            <Text
                sx={{
                  color: "teal.500",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "sm",
                  mt: 1,
                }}
                onClick={openCreateClientModal}
              >
                Novo cliente
              </Text>
          </Flex>
        </Portal>
      )}
    </Flex>
  );
};
