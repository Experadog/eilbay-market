import React from 'react'

import {
  Box,
  Button,
  Flex,
} from '@chakra-ui/react'

interface Props {
  limit: number
  offset: number
  postsCount: number
  onPageChange: (page: number) => void
}

export default function usePagination({
  limit,
  offset,
  postsCount,
  onPageChange,
}: Props) {
  const currentPage = Math.floor(+offset / limit) + 1
  const totalPages = Math.ceil(postsCount / limit)

  const renderPagination = () => {
    const dotes = () => (
      <Flex className="space-x-1">
        <Box className="w-2 h-2 rounded-full bg-slate-400"></Box>
        <Box className="w-2 h-2 rounded-full bg-slate-400"></Box>
        <Box className="w-2 h-2 rounded-full bg-slate-400"></Box>
      </Flex>
    )

    const renderPageNumbers = () => {
      const pageNumbers = []
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }

      const result = []

      if (currentPage > 3) {
        result.push(dotes())
      }

      for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
        result.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            className="border border-slate-400 text-slate-400"
          >
            {i}
          </Button>,
        )
      }

      result.push(
        <Button
          key={currentPage}
          variant="solid"
          className="bg-btnBg hover:bg-btnBgHover text-white"
        >
          {currentPage}
        </Button>,
      )

      for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 2); i++) {
        result.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            className="border border-slate-400 text-slate-400"
          >
            {i}
          </Button>,
        )
      }

      if (currentPage < totalPages - 2) {
        result.push(dotes())
      }

      return result
    }

    return <Flex className="items-center space-x-4">{renderPageNumbers()}</Flex>
  }

  return {
    renderPagination,
  }
}
