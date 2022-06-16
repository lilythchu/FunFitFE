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
            // icon={{
            //   name: icon,
            //   type: 'font-awesome',
            //   size: 20,
            // }}
            containerStyle={styles.container}
            mode="outlined"
            selectedColor={globalColors.navyBlue}
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
            mode="outlined"
            selectedColor={globalColors.navyBlue}
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
    borderWidth: 1,
    borderColor: globalColors.navyBlue,
  }
});
