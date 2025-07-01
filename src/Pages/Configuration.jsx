import React from 'react'
import { useModal } from '../Context/ModalsContext'
import { Button } from '@chakra-ui/react';

export const Configuration = () => {
  const {openEditModal} = useModal();
  return (
    <Button onClick={()=>openEditModal()}>Abrir modal de edição</Button>
  )
}
export default Configuration