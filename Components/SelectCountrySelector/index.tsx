import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const data = [
  { label: 'Toronto, Canada', value: 'Toronto' },
  { label: 'Singapore, Singapore', value: 'Singapore' },
  { label: 'London, England', value: 'London' },
  { label: 'Paris, France', value: 'Paris' },
  { label: 'Barcelona, Spain', value: 'Barcelona' },
  { label: 'Tokyo, Japan', value: 'Tokyo' }
]

const DropdownComponent = () => {
  const [value, setValue] = useState(null)

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Search for destination"
      searchPlaceholder="Search Cities"
      value={value}
      onChange={(item) => {
        setValue(item.value)
      }}
      renderItem={renderItem}
    />
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontFamily: 'Corbel',
    elevation: 2
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Corbel'
  },
  iconStyle: {
    width: 20,
    height: 20,
    fontFamily: 'Corbel'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Corbel'
  }
})
