import React, {useState} from "react"; 
import { StyleSheet, View, Text } from "react-native";
import { Chip, ThemeProvider } from '@rneui/themed';
import globalColors from "../../styles/colors";

const CustomChip = ({text, icon, array, ...props}) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ThemeProvider>
      {!isSelected 
        ? <Chip
            title={text}
            type='outline'
            containerStyle={[styles.container, {borderColor: globalColors.cream}]}
            selectedColor={globalColors.blueGrotto}
            onPress={() => {
              setIsSelected(!isSelected);
              array.push(text);
            }}
            {...props}
          />
        : <Chip
            title={text}
            type='outline'
            icon={{
              name: 'x',
              type: 'feather',
              size: 14,
              color: globalColors.blueFaded,
            }}
            iconRight
            containerStyle={styles.container}
            selectedColor={globalColors.blueGrotto}
            onPress={() => {
              setIsSelected(!isSelected);
              array.pop(text);
            }}
            {...props}
          />
      }
    </ThemeProvider>
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    height: 40,
    borderWidth: 2,
    borderColor: globalColors.navyBlue,
  }
});
