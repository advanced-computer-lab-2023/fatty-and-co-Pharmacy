import React, { useState, useMemo, useEffect } from "react";
import { useMultipleSelection, useCombobox } from "downshift";
import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
} from "@chakra-ui/react";

function MultiSelect({
  initialItems,
  selectedItems,
  setSelectedItems,
  onSelectedItemsChange,
  placeholder,
  labelKey,
  valueKey,
  ...rest
}) {
  const [inputValue, setInputValue] = useState("");
  //   const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const items = useMemo(() => {
    return initialItems.filter(
      (item) =>
        item[labelKey].toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedItems.map((i) => i[labelKey]).includes(item[labelKey])
    );
  }, [initialItems, inputValue, selectedItems, labelKey]);

  const {
    getSelectedItemProps,
    getDropdownProps,
    removeSelectedItem,
  } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems }) {
      if (newSelectedItems) {
        setSelectedItems(newSelectedItems);
      }
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
    itemToString: (item) => (item ? item[labelKey] : ""),
    inputValue,
    onStateChange({
      inputValue: newInputValue,
      selectedItem: newSelectedItem,
      type,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            setSelectedItems([...selectedItems, newSelectedItem]);
            setInputValue("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue);
          break;
        default:
          break;
      }
    },
  });

  // Render component...
  return (
    <Box w="592px">
      <Box d="flex" flexDirection="column" gap="1">
        <Box
          d="flex"
          gap="2"
          alignItems="center"
          flexWrap="wrap"
          p="1.5"
          shadow="sm"
          bg="white"
        >
          <Flex direction={"row"} wrap="wrap">
            {selectedItems.map((selectedItem, index) => (
              <Tag
                key={`selected-item-${index}`}
                borderRadius="md"
                bg="gray.100"
                mr="2"
                mb="2"
              >
                <TagLabel>{selectedItem[labelKey]}</TagLabel>
                <TagCloseButton
                  onClick={() => removeSelectedItem(selectedItem)}
                />
              </Tag>
            ))}
            <Box flexShrink={0}>
              <Input
                placeholder={placeholder}
                {...getInputProps(
                  getDropdownProps({ preventKeyAction: isOpen })
                )}
                border="none" // Remove border from the input field
              />
            </Box>
          </Flex>
        </Box>
      </Box>
      <List
        pos="absolute"
        w="inherit"
        bg="white"
        mt="1"
        shadow="md"
        maxH="80"
        overflow="scroll"
        p="0"
        zIndex="10"
        display={isOpen && items.length ? "block" : "none"}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <ListItem
              py="2"
              px="3"
              shadow="sm"
              bg={highlightedIndex === index ? "blue.300" : undefined}
              fontWeight={selectedItem === item ? "bold" : undefined}
              key={`${item[valueKey]}${index}`}
              {...getItemProps({ item, index })}
            >
              <Box>{item[labelKey]}</Box>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default MultiSelect;
