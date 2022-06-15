import React, {useState} from "react"; 
import { StyleSheet, View, Text } from "react-native";
import { Chip } from "@rneui/themed";
import globalColors from "../../styles/colors";

const CustomChip = ({text, icon}) => {
  const [active, setActive] = useState(true);
  return (
    <View style={styles.chip}>
      <Chip
        icon={icon}
        mode="outlined"
        selectedColor={globalColors.navyBlue}
        disabled={!active}
        //onPress={() => {
        //   array.push(text);
        //   setActive(false);
        // }}
      >
        {text}
      </Chip>
    </View>
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  chip: {
    width: 150,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});