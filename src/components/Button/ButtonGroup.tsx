import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../Text/Text';
const ButtonWidth = Dimensions.get('window').width / 4 - 10;
interface ButtonGroupProps<T> {
  buttons?: T[];
  onPress?: (index: number, selectedValue: T) => void;
  datafield: keyof T;
}
export default function ButtonGroup<T>(props: ButtonGroupProps<T>) {
  const activeButtonIndex = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const {buttons, onPress, datafield} = props;
  const handlePress = (index: any) => {
    activeButtonIndex.value = index;
    setActiveIndex(index);
    if (buttons) {
      onPress && onPress(index, buttons[index]);
    }
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(activeButtonIndex.value * ButtonWidth, {
            duration: 300,
          }),
        },
      ],
    };
  });
  if (!buttons) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[styles.animatedBackground, animatedBackgroundStyle]}
        />
        {buttons?.map((title, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={styles.button}>
            <CustomText
              fontSizes="caption1"
              color={activeIndex === index ? 'white' : 'default'}>
              {title[datafield] as string}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: ButtonWidth * 4,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F8505',
    backgroundColor: '#E7F6E9',
  },
  animatedBackground: {
    position: 'absolute',
    width: ButtonWidth,
    height: '100%',
    backgroundColor: '#1F8505',
    borderRadius: 25,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
