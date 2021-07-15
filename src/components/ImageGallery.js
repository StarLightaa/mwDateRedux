import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import ImagePicker from './ImagePicker';
import ImageViewer from 'react-native-image-zoom-viewer';

import {SERVER_URL} from '../store/constants/url';
import {addPhoto, deletePhoto} from '../store/actions/photos';

const ImageGallery = ({imagesArr}) => {
  const dispatch = useDispatch();
  const sheetRef = useRef(null);
  const [images, setImages] = useState([]);
  const [image_index, setImage_index] = useState(0);

  useEffect(() => {
    prepareData();
  }, [prepareData, imagesArr]);

  const prepareData = () => {
    let arr = [];
    arr = imagesArr?.map((obj, index) => {
      return {
        id: obj.id,
        url: SERVER_URL + obj.src,
        index: index,
      };
    });
    setImages(arr);
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    dispatch(addPhoto(image));
    closeSheet();
  };

  const onDelete = () => {
    let deleteId = getCurrentImageId()
    dispatch(deletePhoto(deleteId));
    closeModal();
  };

  const getCurrentImageId = () => {
    let image = images.find(el => el.index == image_index);
    return image?.id;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = index => {
    setImage_index(index);
    if (!modalVisible) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    if (modalVisible) {
      setModalVisible(false);
    }
  };

  const footerComponent = () => {
    return (
      <View style={styles.actionPanel}>
        <TouchableOpacity
          onPress={() => {onDelete()}}>
          <Icon
            name="trash-2-outline"
            fill="#ccc"
            width={26}
            height={26}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <ImageViewer
          imageUrls={images}
          index={image_index}
          enableSwipeDown={true}
          enablePreload={true}
          loadingRender={() => (
            <ActivityIndicator
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              size="large"
              color="#FFFFFF"
            />
          )}
          onSwipeDown={() => closeModal()}
          saveToLocalByLongPress={false}
          menuContext={{}}
          renderFooter={footerComponent}
          onChange={setImage_index}
        />
      </Modal>

      <View style={[styles.row, {marginBottom: gap}]}>
        {images?.[0] && images?.[0]?.url ? (
          <TouchableOpacity
            style={[styles.mainPhoto, {marginRight: gap}]}
            onPress={() => openModal(0)}>
            <Image
              width={mainPhotoDimension}
              height={mainPhotoDimension}
              source={{uri: images[0].url}}
              style={styles.mainImageView}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.mainPhoto, {marginRight: gap}]}
            onPress={openSheet}>
            <Icon
              name="plus-outline"
              fill="#ccc"
              width={mainPhotoDimension}
              height={mainPhotoDimension}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        )}

        <View style={styles.right}>
          {images?.[1] && images?.[1]?.url ? (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={() => openModal(1)}>
              <Image
                width={photoDimension}
                height={photoDimension}
                source={{uri: images[1].url}}
                style={styles.imageView}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={openSheet}>
              <Icon
                name="plus-outline"
                fill="#ccc"
                width={photoDimension}
                height={photoDimension}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          )}

          {images?.[2] && images?.[2]?.url ? (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={() => openModal(2)}>
              <Image
                width={photoDimension}
                height={photoDimension}
                source={{uri: images[2].url}}
                style={styles.imageView}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={openSheet}>
              <Icon
                name="plus-outline"
                fill="#ccc"
                width={photoDimension}
                height={photoDimension}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={{flexDirection: 'row', marginRight: gap}}>
          {images?.[3] && images?.[3]?.url ? (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={() => openModal(3)}>
              <Image
                width={photoDimension}
                height={photoDimension}
                source={{uri: images[3].url}}
                style={styles.imageView}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.photo, {marginRight: gap}]}
              onPress={openSheet}>
              <Icon
                name="plus-outline"
                fill="#ccc"
                width={photoDimension}
                height={photoDimension}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          )}

          {images?.[4] && images?.[4]?.url ? (
            <TouchableOpacity
              style={[styles.photo]}
              onPress={() => openModal(4)}>
              <Image
                width={photoDimension}
                height={photoDimension}
                source={{uri: images[4].url}}
                style={styles.imageView}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.photo]} onPress={openSheet}>
              <Icon
                name="plus-outline"
                fill="#ccc"
                width={photoDimension}
                height={photoDimension}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {images?.[5] && images?.[5]?.url ? (
          <TouchableOpacity style={styles.photo} onPress={() => openModal(5)}>
            <Image
              width={photoDimension}
              height={photoDimension}
              source={{uri: images[5].url}}
              style={styles.imageView}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.photo} onPress={openSheet}>
            <Icon
              name="plus-outline"
              fill="#ccc"
              width={photoDimension}
              height={photoDimension}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </Layout>
  );
};

export default ImageGallery;

const {height, width} = Dimensions.get('screen');
const screenWidth = width - 40;
const gap = screenWidth * 0.05;
const photoDimension = screenWidth * 0.3;
const mainPhotoDimension = photoDimension * 2 + gap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    // justifyContent: "space-between",
  },
  mainPhoto: {
    width: mainPhotoDimension,
    height: mainPhotoDimension,
    borderRadius: 10,
  },
  photo: {
    width: photoDimension,
    height: photoDimension,
  },
  right: {
    justifyContent: 'space-between',
  },

  mainImageView: {
    width: mainPhotoDimension,
    height: mainPhotoDimension,
    alignSelf: 'center',
    borderRadius: 10,
  },
  imageView: {
    width: photoDimension,
    height: photoDimension,
    alignSelf: 'center',
    borderRadius: 10,
  },
  addIcon: {
    width: photoDimension,
    height: photoDimension,
    borderWidth: 3,
    borderColor: '#ccc',
    borderStyle: 'dotted',
    borderRadius: 10,
  },
  actionPanel: {
    flex: 1,
    width: width,
    height: 60,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeIcon: {
    width: 26,
    height: 26,
  }
});
