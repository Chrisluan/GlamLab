import React from 'react'
import { ClientCard } from '../Components/Clients/ClientCard';
import { useData } from '../Context/DataContext';
import { Flex } from '@chakra-ui/react';
import { DeleteClient } from '../Context/DBConnectionMethods/Clients';
export const Clients = () => {
  const { clients, UpdateAllData } = useData();
  

  return (
    <Flex width={"100%"} flexDir={'column'}>
      {
        clients.map((cl) => 
      <ClientCard key={cl._id} client={cl} onDelete={async () => {
        try {
          await DeleteClient(cl._id);
          await UpdateAllData();
        }catch (error) {
          console.error("Erro ao deletar cliente:", error);
        }
      }}/>
    )
      }
    </Flex>
  
  
  )

}
export default Clients;
