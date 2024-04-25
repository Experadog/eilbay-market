import React from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  header?: string
  children: React.ReactNode
  onAction: any
  remove?: boolean
  isLoading?: boolean
}

export const ModalWindow = ({
  isOpen,
  onClose,
  header,
  children,
  onAction,
  remove,
  isLoading,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {header && (
          <ModalHeader>
            {header}
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
          >
            Отмена
          </Button>

          <Button
            colorScheme="blue"
            className="bg-btnBg hover:bg-btnBgHover"
            onClick={onAction}
            isLoading={isLoading}
          >
            {remove ? 'Удалить' : 'Сохранить'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
