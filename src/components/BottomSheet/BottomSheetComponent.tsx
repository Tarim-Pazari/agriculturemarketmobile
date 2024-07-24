import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export interface BottomSheetComponentProps {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
  children?: React.ReactNode;
  snapPoints: string[];
  enableClose?: boolean;
  zIndex?: number;
  bgColor?: string;
  showIndicator?: boolean;
}
const BottomSheetComponent = React.forwardRef(
  (props: BottomSheetComponentProps, ref: any) => {
    {
      const snapPoints = useMemo(() => props.snapPoints, []);

      return (
        <BottomSheet
          keyboardBehavior="interactive"
          backgroundStyle={{
            backgroundColor: props.bgColor || '#fff',
          }}
          containerStyle={{
            zIndex: props.zIndex || 11,
            elevation: 11,
          }}
          handleIndicatorStyle={{
            display:
              props.showIndicator === undefined || props.showIndicator === true
                ? 'flex'
                : 'none',
          }}
          ref={ref}
          enablePanDownToClose={props.enableClose}
          index={props.isOpen ? 0 : -1}
          onChange={index => {
            if (index === -1) {
              props.handleOpen(false);
            }
          }}
          backdropComponent={
            props.enableClose && props.isOpen
              ? prop => (
                  <TouchableOpacity
                    onPress={() => {
                      if (ref?.current) {
                        props.handleOpen(false);
                        ref.current?.close();
                      }
                    }}
                    activeOpacity={ref?.current ? 0.8 : 1}
                    {...prop}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        flex: 1,
                      }}
                    />
                  </TouchableOpacity>
                )
              : null
          }
          snapPoints={snapPoints}>
          {props.children}
        </BottomSheet>
      );
    }
  },
);
export default BottomSheetComponent;
