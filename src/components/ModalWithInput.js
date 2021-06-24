import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Card, Modal, Text, Input} from '@ui-kitten/components';

import {LocalizationContext} from '../localization/LocalizationContext';

const ModalWithInput = ({
  modalVisible,
  setModalVisible,
  inputValue,
  setInputValue,
  inputPlaceholder,
  prevState,
  title,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const cancelModal = () => {
    setInputValue(prevState);
    setModalVisible(false);
  };

  const saveModal = () => {
    if (inputValue.trim() === prevState || inputValue.trim() === '') {
      setInputValue(prevState);
      setModalVisible(false);
      return;
    }
    dispatch(onSuccess);
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => cancelModal()}>
      <Card style={styles.modalContainer} disabled={true}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Input
          style={styles.modalInput}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChangeText={nextValue => setInputValue(nextValue)}
        />
        <View style={styles.modalBtns}>
          <TouchableOpacity
            style={styles.modalCancel}
            onPress={() => cancelModal()}>
            <Text>{translations.MODAL.CANCEL}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalSave}
            onPress={() => saveModal()}>
            <Text>{translations.MODAL.SAVE}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Modal>
  );
};

export default ModalWithInput;

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: 192,
    minWidth: '80%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalInput: {
    flex: 1,
    margin: 2,
  },
  modalBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalSave: {
    marginLeft: 20,
  },
});
