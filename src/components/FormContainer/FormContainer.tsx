import React, {
  useEffect,
  useState,
  useCallback,
  ReactNode,
  MutableRefObject,
} from 'react';
import {View} from 'react-native';

export interface FormContainerProps {
  children: ReactNode;
  gap?: number;
  formContainerRef?: MutableRefObject<FormContainerRef | null>;
}

export interface FormContainerRef {
  setErrorDataFiels: (errorData: any) => void;
}

const FormContainer = (props: FormContainerProps) => {
  const {children: initialChildren, gap = 10, formContainerRef} = props;
  const [children, setChildren] = useState<ReactNode[] | any>(
    React.Children.toArray(initialChildren),
  );
  const [errors, setErrors] = useState<{[key: string]: string | undefined}>({});
  const checkValidation = useCallback((errorData: any) => {
    setErrors(errorData);
  }, []);

  useEffect(() => {
    if (formContainerRef) {
      formContainerRef.current = {
        setErrorDataFiels: (errorData: any) => {
          checkValidation(errorData);
        },
      };
    }
  }, [formContainerRef, checkValidation]);

  useEffect(() => {
    setChildren(
      React.Children.map(initialChildren, child => {
        if (React.isValidElement(child)) {
          const childProps = {...child.props};
          const error = errors[childProps.id];
          if (error && error !== '') {
            if (childProps.type === 'text') {
              if (childProps.value === '') {
                childProps.errorMessage = error;
              } else {
                delete childProps.errorMessage;
              }
            }
            if (childProps.type === 'checkbox') {
              if (!childProps.checked) {
                childProps.errorMessage = error;
              } else {
                delete childProps.errorMessage;
              }
            }
          } else {
            delete childProps.errorMessage;
          }
          return React.cloneElement(child, childProps);
        }
        return child;
      }),
    );
  }, [initialChildren, errors]);

  return <View style={{flexDirection: 'column', gap}}>{children}</View>;
};

export default FormContainer;
