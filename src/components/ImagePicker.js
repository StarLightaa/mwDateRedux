import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Icon} from '@ui-kitten/components';
import ImagePickerCropper from 'react-native-image-crop-picker';

import {LocalizationContext} from '../localization/LocalizationContext';

const OptionsItem = ({name, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.pickerOption} key={name}>
      {icon}
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const {translations} = useContext(LocalizationContext);
  const options = [
    {
      name: translations.COMMON.MAKE_PHOTO,
      icon: (
        <Icon name="camera-outline" fill="#E5ABA9" width={26} height={26} />
      ),
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {});
      },
    },
    {
      name: translations.COMMON.CHOOSE_PHOTO,
      icon: <Icon name="image-outline" fill="#E5ABA9" width={26} height={26} />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {});
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={190}
      openDuration={250}
      dragFromTopOnly
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, onPress, icon}) => (
          <OptionsItem key={name} name={name} icon={icon} onPress={onPress} />
        ))}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  pickerOption: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },

  optionsWrapper: {
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 17,
    paddingLeft: 17,
  },
});

export default ImagePicker;
