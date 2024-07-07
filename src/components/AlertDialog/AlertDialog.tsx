import Modal, {
  ModalContent,
  ModalPortal,
  SlideAnimation,
} from 'react-native-modals';
import {SIZES} from '../../constant/theme';
import {Appearance, Text, View} from 'react-native';
import Button from '../Button/Button';
import styled from 'styled-components';
import Divider from '../Divider/Divider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {
  faExclamationCircle,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../Text/Text';

interface ModalProps {
  title?: string;
  message?: string;
  content?: any;
  disableCloseOnTouchOutside?: boolean;
  onConfirmText?: string;
  onConfirm?: () => void;
  onCancelText?: string;
  isAutoClose?: boolean;
  onCancel?: () => void;
  type?: 'success' | 'error' | 'warning';
}

class AlertDialog {
  ids: any[] = [];

  showLogoutModal(onConfirm: () => void) {
    return new Promise(resolve => {
      const id = ModalPortal.show(
        <Modal
          visible={true}
          onTouchOutside={() => {
            ModalPortal.dismiss(id);
            this.ids.pop();
            resolve(false);
          }}
          overlayBackgroundColor={'black'}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent style={{backgroundColor: '#fff'}}>
            <View style={{width: SIZES.width - 80}}>
              <View>
                <TitleContainer>
                  <Title adjustsFontSizeToFit>Çıkış Yap</Title>
                </TitleContainer>
                <Divider marginTop="10" marginBottom="10" />
              </View>
              <View>
                <Text style={{textAlign: 'center'}}>
                  Çıkış yapmak istediğinize emin misiniz?
                </Text>
              </View>
              <ButtonContainer>
                <Button
                  outline
                  text="İptal"
                  onPress={() => {
                    ModalPortal.dismiss(id);
                    this.ids.pop();
                    resolve(false);
                  }}
                />
                <Button
                  text="Çıkış Yap"
                  onPress={() => {
                    onConfirm();
                    ModalPortal.dismiss(id);
                    this.ids.pop();
                    resolve(true);
                  }}
                />
              </ButtonContainer>
            </View>
          </ModalContent>
        </Modal>,
      );

      this.ids.push(id);
    });
  }

  showLoginModal() {
    return new Promise(resolve => {
      const id = ModalPortal.show(
        <Modal
          visible={true}
          onTouchOutside={() => {
            ModalPortal.dismiss(id);
            this.ids.pop();
            resolve(false);
          }}
          overlayBackgroundColor={'black'}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent style={{backgroundColor: '#fff'}}>
            <View style={{width: SIZES.width - 80}}>
              <View>
                <TitleContainer>
                  <Title adjustsFontSizeToFit>Giriş Yap</Title>
                </TitleContainer>
                <Divider marginTop="10" marginBottom="10" />
              </View>
              <View>
                <Text style={{textAlign: 'center'}}>
                  Lütfen giriş yapmak için gerekli bilgileri giriniz.
                </Text>
              </View>
              <ButtonContainer>
                <Button
                  text="Giriş Yap"
                  onPress={() => {
                    ModalPortal.dismiss(id);
                    this.ids.pop();
                    resolve(true);
                  }}
                />
                <Button
                  outline
                  text="Kayıt Ol"
                  onPress={() => {
                    ModalPortal.dismiss(id);
                    this.ids.pop();
                    resolve(false);
                  }}
                />
              </ButtonContainer>
            </View>
          </ModalContent>
        </Modal>,
      );

      this.ids.push(id);
    });
  }
  showModal(props: ModalProps): Promise<boolean> {
    console.log(props.isAutoClose, 'props.isAutoClose');
    let isAutoHide = props?.isAutoClose ?? true;
    return new Promise(resolve => {
      const id = ModalPortal.show(
        <Modal
          visible={true}
          onTouchOutside={() => {
            if (!props.disableCloseOnTouchOutside) {
              ModalPortal.dismiss(id);
              this.ids.pop();
              resolve(true);
            }
          }}
          overlayBackgroundColor={'black'}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent style={{backgroundColor: '#fff'}}>
            <View style={{width: SIZES.width - 80}}>
              {props?.title?.length && (
                <View>
                  <TitleContainer>
                    <Title adjustsFontSizeToFit>{props.title}</Title>
                  </TitleContainer>
                  <Divider marginTop="10" marginBottom="10" />
                </View>
              )}
              {props?.type && (
                <>
                  <IconContainer>
                    <FontAwesomeIcon
                      icon={
                        props.type === 'success'
                          ? faCheckCircle
                          : props.type === 'error'
                          ? faWarning
                          : faExclamationCircle
                      }
                      size={50}
                      color={
                        props.type === 'success'
                          ? 'green'
                          : props.type === 'error'
                          ? 'red'
                          : 'orange'
                      }
                    />
                  </IconContainer>
                </>
              )}
              {props.message ? (
                <Message adjustsFontSizeToFit={true}>{props.message}</Message>
              ) : (
                props.content
              )}
              {
                <ButtonContainer>
                  {props.onCancel && (
                    <Button
                      outline
                      text={props.onCancelText || 'İptal'}
                      onPress={() => {
                        ModalPortal.dismiss(id);
                        this.ids.pop();
                        resolve(false);
                        props.onCancel && props.onCancel();
                      }}
                    />
                  )}
                  {props.onConfirm && (
                    <Button
                      text={props.onConfirmText || 'Onayla'}
                      style={{flex: 1}}
                      onPress={() => {
                        ModalPortal.dismiss(id);
                        this.ids.pop();
                        resolve(false);
                        props.onConfirm && props.onConfirm();
                      }}
                    />
                  )}
                </ButtonContainer>
              }
            </View>
          </ModalContent>
        </Modal>,
      );
      this.ids.push(id);
      if (isAutoHide) {
        setTimeout(() => {
          ModalPortal.dismiss(id);
          this.ids.pop();
          resolve(false);
        }, 2000);
      }
    });
  }
  update() {
    this.ids.forEach(item => {
      ModalPortal.update(item);
    });
  }

  dismissAll() {
    ModalPortal.dismissAll();
    this.ids = [];
  }

  dismiss() {
    if (this.ids.length > 0) {
      ModalPortal.dismiss(this.ids[this.ids.length - 1]);
      this.ids.pop();
    }
  }
}
export default new AlertDialog();

const Title = styled(CustomText)`
  text-align: center;
  padding-horizontal: 20px;
  font-size: 18px;
  color: #686f79;
`;
const Message = styled(CustomText)`
  text-align: center;
  font-size: 16px;
  color: #686f79;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const TitleContainer = styled(View)`
  justify-items: center;
`;
const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;
const IconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
