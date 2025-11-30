import React, { useEffect, useState, useRef } from "react";
import { Input, InputGroup, Flex, Portal, Button, Box } from "@chakra-ui/react";

export const SearchAndSelectBar = ({
  list,
  formNameID,
  onChange,
  onCreateNew,
  getLabel = (obj) => obj.name, // função para pegar o texto exibido
  getValue = (obj) => obj, // função para enviar valor no onChange
}) => {
  const [filteredList, setFilteredList] = useState(list);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef();

  // Filtragem dinâmica
  useEffect(() => {
    setFilteredList(
      searchKeyword.length === 0
        ? list
        : list.filter((obj) =>
            getLabel(obj).toLowerCase().includes(searchKeyword.toLowerCase())
          )
    );
  }, [searchKeyword, list]);

  // Calcula posição do dropdown
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
          onBlur={() =>
            setTimeout(() => {
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
            borderRadius="md"
            boxShadow="md"
          >
            <Flex
              flexDir="column"
              maxHeight="200px"
              overflowY="auto"
              borderRadius="md"
              gap={2}
            >
              {filteredList.length > 0 ? (
                filteredList.map((obj) => (
                  <Box
                    key={obj._id || getLabel(obj)} // fallback
                    sx={{
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      fontSize: "sm",
                      padding: "10px 15px",
                      backgroundColor: "brand.100",
                      borderRadius: "md",
                      _hover: { backgroundColor: "brand.300" },
                    }}
                    onClick={() => {
                      onChange?.({
                        target: {
                          name: formNameID,
                          value: getValue(obj),
                        },
                      });

                      setSearchKeyword(getLabel(obj));
                      setIsSearching(false);
                    }}
                  >
                    {getLabel(obj)}
                  </Box>
                ))
              ) : (
                <span>Nenhum Registro Encontrado</span>
              )}
            </Flex>
            {onCreateNew && (
              <Button
                variant="solid"
                sx={{ fontSize: "sm", mt: 1 }}
                onClick={() => {
                  onCreateNew?.();
                  setIsSearching(false);
                }}
              >
                Criar Novo
              </Button>
            )}
          </Flex>
        </Portal>
      )}
    </Flex>
  );
};
