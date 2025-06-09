import { Box, useRadio } from "@chakra-ui/react";

export default function SidebarButton(props) {
  // useRadio agora recebe as props corretas (como `isChecked`, `onChange`, etc.)
  // que foram injetadas pelo cloneElement no contêiner.
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        _checked={{
          bg: '#f6d7f9',
          color: 'white',
          overflow:"hidden",
          position: "relative",
          color:"#35083a",
          _after: {
            content: '""',
            position: 'absolute',
            left: 0,
            top:0,
            width: '5px',
            height: "100%",
            
            bg: "#35083a"
          }
        }}
        _focus={{
          
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}