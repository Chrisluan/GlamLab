import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFFCF9",
      100: "#F6EFE7",
      200: "#E7DCCD",
      300: "#F9CFAF",
      400: "#D3A4B5",
      500: "#9DC8C4",
      600: "#3E3A36",
      700: "#2B2724",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "brand.600",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.300",
          color: "brand.700",
          _hover: {
            bg: "brand.200",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "brand.200",
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px #9DC8C4",
            },
            bg: "brand.100",
          },
        },
      },
    },
  },
});

export default theme;
