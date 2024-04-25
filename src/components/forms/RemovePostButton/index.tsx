import React from 'react'

import { 
  Button, 
  ButtonGroup, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalOverlay, 
  useDisclosure, 
} from '@chakra-ui/react'

interface Props {
  isLoading: boolean
  onRemoveButton: () => void
}

export const RemovePostButton = ({ 
  isLoading, 
  onRemoveButton,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className="w-2/5 text-white bg-red-500 hover:bg-red-400 rounded-[30px] tablet:py-[25px] mt-[30px] font-semibold"
        type="submit"
        onClick={onOpen}
        isLoading={isLoading}
      >
        Удалить
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="rounded-3xl p-4 text-center">
          <ModalCloseButton />
          <ModalBody className="font-semibold">
            Вы уверены что хотите удалить товар?
          </ModalBody>

          <ModalFooter>
            <ButtonGroup className="w-full gap-4">
              <Button 
                onClick={onRemoveButton}
                className="text-white bg-red-500 hover:bg-red-400 w-full rounded-full"
              >
                Да
              </Button>
              <Button 
                onClick={onClose}
                colorScheme="blue"
                className="text-white w-full rounded-full" 
              >
                Нет
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
