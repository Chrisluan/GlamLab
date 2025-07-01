// theme.js
import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#FFF9F5",
        color: "brand.700",
      },
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: "#FFF9F5",
      100: "#F8F4EF",
      200: "#E8E3D9",
      300: "#C8B58D", // botão destacado
      
      400: "#A67F6A",
      500: "#C7D1C8", // campos selecionados/bordas
      600: "#3A4046", // texto principal
      700: "#362B31", // títulos/headers
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "6",
        fontWeight: "medium",
        color: "brand.600",
        _hover: {
          bg: "brand.400",
        },
      },
      variants: {
        solid: {
          bg: "brand.100",
          color: "brand.400",
          fontWeight: "600",
          _hover: {
            color:"brand.700",
            bg: "brand.100",
          },
        },
        secondary: {
          borderColor: "brand.300",
          color: "brand.400",
          _hover: {
            bg: "brand.50",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "brand.400",
            _focus: {
              borderColor: "brand.300",
              boxShadow: "0 0 0 1px #C8B58D",
            },
            rounded: "xl",
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderColor: "brand.400",
            _focus: {
              borderColor: "brand.300",
              boxShadow: "0 0 0 1px #C8B58D",
            },
            rounded: "xl",
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: "brand.400",
          _focus: {
            borderColor: "brand.300",
            boxShadow: "0 0 0 1px #C8B58D",
          },
          rounded: "xl",
        },
      },
    },
  },
});

export default theme;
