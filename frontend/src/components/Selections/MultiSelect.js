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
  InputGroup,
  IconButton,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";

function MultiSelect({
  initialItems,
  selectedItems,
  setSelectedItems,
  onSelectedItemsChange,
  placeholder,
  labelKey,
  valueKey,
  ...props
}) {
  const rest = props;
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const inputBg = useColorModeValue("white", "gray.800");
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

  // FIXME: removing an item from the selected items doesnt allow me to pick that item again
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

  // TODO: lots of styling issues here I cant fix
  return (
    <Flex
      direction="column"
      marginRight={props.marginRight || "auto"}
      marginLeft={props.marginLeft || "auto"}
      marginTop={props.marginTop || "auto"}
      marginBottom={props.marginBottom || "auto"}
    >
      <InputGroup
        borderRadius="15px"
        w="300px"
        h="auto"
        p="1"
        m="1"
        marginLeft="-10px"
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
        {...rest}
      >
        <Input
          placeholder={placeholder}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          fontSize="md" // Increase the font size
          py="2" // Increase the padding
          borderRadius={props.borderRadius || "inherit"}
        />
      </InputGroup>
      <Flex
        direction="row" // Change this line
        wrap="wrap"
      >
        {selectedItems.map((selectedItem, index) => (
          <Tag
            key={`selected-item-${index}`}
            pos="relative"
            borderRadius="15px"
            mr="2"
            mb="2"
            p="1"
            maxWidth="100px"
          >
            <TagLabel>{selectedItem[labelKey]}</TagLabel>
            <TagCloseButton onClick={() => removeSelectedItem(selectedItem)} />
          </Tag>
        ))}
      </Flex>
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
    </Flex>
  );
}

export default MultiSelect;
