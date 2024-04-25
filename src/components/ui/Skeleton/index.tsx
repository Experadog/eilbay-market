import React from 'react'

import { Box, Skeleton } from '@chakra-ui/react'

const CardSkeleton = () => {
  return (
    <Box className="w-full h-full border rounded-lg overflow-hidden">
      <Skeleton className="h-[200px] tablet:h-[250px] desktop:h-[300px] w-full" />
      <Box p="6">
        <Skeleton height="20px" my="2" />
        <Skeleton height="20px" my="2" />
        <Skeleton height="20px" my="2" />
      </Box>
    </Box>
  )
}

export default CardSkeleton
