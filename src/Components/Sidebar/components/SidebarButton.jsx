import { Box, useRadio } from "@chakra-ui/react";

export default function SidebarButton(props) {
  // useRadio agora recebe as props corretas (como `isChecked`, `onChange`, etc.)
  // que foram injetadas pelo cloneElement no contêiner.
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        position= "relative"
        _checked={{
          bg: "brand.200",
          color: "white",
          overflow: "hidden",
          position: "relative",
          color: "brand.700",
          _after: {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            width: "5px",
            height: "100%",
            bg: "brand.300",
          },
        }}
        _hover={{
          bg: "brand.100",
          _after: {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            width: "2px",
            height: "100%",
            bg: "brand.300",
          },
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
