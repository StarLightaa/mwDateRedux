import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Card, Modal, Text, Input} from '@ui-kitten/components';

import {LocalizationContext} from '../localization/LocalizationContext';

const ModalUnsavedData = ({
  modalVisible,
  setModalVisible,
  prevState,
  title,
  description,
  onSuccess,
}) => {
  const {translations} = useContext(LocalizationContext);

  const No = () => {
    setModalVisible(false);
  };

  const Ok = () => {
    setModalVisible(false);
    onSuccess();
  };

  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => No()}>
      <Card style={styles.modalContainer} disabled={true}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalDescription}>{description}</Text>

        <View style={styles.modalBtns}>
          <TouchableOpacity
            style={styles.modalCancel}
            onPress={() => No()}>
            <Text>{translations.MODAL_UNSAVED.NO_BTN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalSave}
            onPress={() => Ok()}>
            <Text>{translations.MODAL_UNSAVED.OK_BTN}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </Modal>
  );
};

export default ModalUnsavedData;

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
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
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
