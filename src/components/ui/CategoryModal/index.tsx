import React from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  ModalFooter,
} from '@chakra-ui/react'
import { IoIosArrowForward, IoMdArrowBack } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

import { CategoriesTypes } from '@/types/categories'

interface Props {
  categories: CategoriesTypes.Item[]
  setSelectedCategory: React.Dispatch<CategoriesTypes.Item>
  setSelectedCategories: React.Dispatch<any>
  selectedCategories: CategoriesTypes.Item[]
}

export default function CategoryModal({
  categories,
  setSelectedCategory,
  setSelectedCategories,
  selectedCategories,
}: Props) {
  const [currentCategories, setCurrentCategories] = React.useState(categories)
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleCategoryClick = (category: CategoriesTypes.Item) => {
    setSelectedCategories((prevCategories: CategoriesTypes.Item[]) => [...prevCategories, category])

    if (category.children.length > 0) {
      setCurrentCategories(category.children)
    } else {
      setSelectedCategory(category)
      onClose()
    }
  }

  const handleBackButtonClick = () => {
    if (selectedCategories.length > 1) {
      const parentCategory = selectedCategories[selectedCategories.length - 2]
      setCurrentCategories(parentCategory.children)
      setSelectedCategories((prevCategories: CategoriesTypes.Item[]) => prevCategories.slice(0, -1))
    } else {
      setCurrentCategories(categories)
      setSelectedCategories([])
    }
  }

  const onClickOpen = () => {
    setSelectedCategories([])
    setCurrentCategories(categories)
    onOpen()
  }

  return (
    <>
      <Button
        colorScheme="twitter"
        variant="outline"
        className="rounded-full"
        onClick={onClickOpen}
      >
        Выбрать
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent className="min-h-[40vh]">
          <ModalHeader className="flex items-center justify-center">
            <button
              className="text-2xl absolute left-5"
              onClick={handleBackButtonClick}
            >
              <IoMdArrowBack className="mr-1" />
            </button>
            <p className="text-lg font-semibold">
              Выберите категорию
            </p>
          </ModalHeader>
          <ModalCloseButton className="top-4 text-sm" />
          <ModalBody>
            <div className="flex flex-wrap gap-5">
              {currentCategories.map((categories) => (
                <div
                  key={categories.id}
                  onClick={() => handleCategoryClick(categories)}
                  className="flex flex-col items-center cursor-pointer max-w-[150px] hover:text-[#0678B5]"
                >
                  <div className="border-[1px] p-3 rounded-full w-[60px]">
                    <Image
                      src={'/img/category.png' || categories.icon}
                      alt=""
                      className="h-8 mx-auto"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <p className="text-sm capitalize">{categories.name.toLowerCase()}</p>
                    <IoIosArrowForward className={twMerge('hidden', categories.children.length && 'block')} />
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <div>
              <p className="capitalize">{selectedCategories.map(category => category.name).join(' > ').toLowerCase()}</p>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
