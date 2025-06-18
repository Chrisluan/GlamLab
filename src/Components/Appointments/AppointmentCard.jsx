import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'

export const AppointmentCard = ({data}) => {
  return (
    <Flex>
        <Text>Nome: {data}</Text>
    </Flex>
  )
}
