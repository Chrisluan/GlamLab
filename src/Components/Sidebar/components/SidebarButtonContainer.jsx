import { Flex, useRadioGroup, VStack } from "@chakra-ui/react";
import React from "react"; // Importar React para usar React.Children e React.cloneElement

function SidebarButtonContainer(props) {
  // 1. Receber `children`, `value` e `onChange` das props
  const { children, value, onChange } = props;

  // 2. Usar as props recebidas no hook useRadioGroup
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'sidebar-options', // Um nome para o grupo é bom para acessibilidade
    value: value,           // O valor controlado pelo estado do pai
    onChange: onChange,     // A função que atualiza o estado do pai
  });

  const group = getRootProps();

  return (
    <Flex flexDir={"column"} {...group}>
      {/* 3. Mapear sobre os `children` para passar as props corretas para cada um.
        Não podemos simplesmente renderizar `{children}`.
      */}
      {React.Children.map(children, (child) => {
        // Obter as props de rádio específicas para o valor deste filho
        const radio = getRadioProps({ value: child.props.value });
        // Clonar o elemento filho e mesclar as novas props de rádio
        return React.cloneElement(child, radio);
      })}
    </Flex>
  );
}

export default SidebarButtonContainer;