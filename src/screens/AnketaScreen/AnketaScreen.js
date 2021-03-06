import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Button, Icon} from '@ui-kitten/components';

import moment from 'moment';
import {LocalizationContext} from '../../localization/LocalizationContext';
import Container from '../../components/Container';
import ModalWithInput from '../../components/ModalWithInput';
import HeaderBar from '../../components/HeaderBar';
import ListItem from '../../components/ListItem';
import ImagePicker from '../../components/ImagePicker';
import ImageGallery from '../../components/ImageGallery';
import {DEFAULT_IMAGE_URI} from '../../store/constants/url';

import {USER_PRIMARY_ITEMS} from '../../store/constants/index';
import {updateUser} from '../../store/actions/auth';
import {getAnketa, getAnketaTitles, getCity} from '../../store/actions/anketa';
import {getPhotos} from '../../store/actions/photos';

import Geolocation from 'react-native-geolocation-service';

const SettingsIcon = props => <Icon {...props} name="settings-2-outline" />;

const AnketaScreen = ({navigation}) => {
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);

  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const [modalNameVisible, setModalNameVisible] = useState(false);
  const anketa = useSelector(store => store.anketa.fields);
  const user = useSelector(store => store.auth.user);
  const name = user ? user?.name : '';
  const birthday = user ? user?.birthday : '';
  const city = user ? user?.city_name : '';

  const sex = user ? user?.sex?.translate : '';
  const [inputName, setInputName] = useState(name);

  const [anketaTitles, setAnketaTitles] = useState([]);
  const [isAnketaLoading, setIsAnketaLoading] = useState(true);
  const [isAnketaTitlesLoading, setIsAnketaTitlesLoading] = useState(true);

  const photos = useSelector(store => store.photos.photos);
  const [isPhotosLoading, setIsPhotosLoading] = useState(true);

  // const [location, setLocation] = useState(null);

  const fetchData = useCallback(async () => {
    await dispatch(getAnketa());
  }, []);

  const fetchAnketaTitles = useCallback(async () => {
    let titles = await dispatch(getAnketaTitles());
    setAnketaTitles(titles);
  }, []);

  const fetchPhotos = useCallback(async () => {
    await dispatch(getPhotos());
    setIsPhotosLoading(false); // call is finished, set to false
  }, []);

  useEffect(() => {
    fetchPhotos().then(() => console.log('photos loading'));
  }, [fetchPhotos]);

  const fetchLocation = useCallback(async () => {}, [fetchLocation]);

  useEffect(() => {
    if (!city) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          // setLocation({
          //   latitude,
          //   longitude,
          // });
          getCityFromCoordinates({latitude, longitude});
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [fetchLocation]);

  const getCityFromCoordinates = useCallback(async location => {
    console.log('location', location);
    if (location == null) {
      return;
    }
    let response = await dispatch(getCity(location));
    let address = response?.addresses[0]?.address;
    let position = (response?.addresses[0]?.position).split(',');
    dispatch(
      updateUser({
        country_name: address?.country || '',
        country_code: address?.countryCode || '',
        city_name: address?.localName || address?.freeformAddress || '',
        position_lat: position[0] || '',
        position_lon: position[1] || '',
      }),
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      setIsAnketaLoading(false);
    }, [fetchData]),
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchAnketaTitles();
      setIsAnketaTitlesLoading(false);
    }, [fetchAnketaTitles]),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchPhotos();
  //     setIsPhotosLoading(false);
  //   }, [fetchPhotos]),
  // );

  const onPressItem = async ({itemTitle, itemValue}) => {
    switch (itemValue) {
      case 'name':
        setModalNameVisible(true);
        break;

      case 'age':
        navigation.navigate('Birthday');
        break;

      case 'sex':
        navigation.navigate('Sex');
        break;

      case 'city':
        navigation.navigate('City');
        break;

      // case 'switch-account':
      //   navigation.navigate('Account', {accounts});
      //   break;

      default:
        break;
    }
  };

  const getMainItemValue = itemValue => {
    switch (itemValue) {
      case 'name':
        return name;

      case 'age':
        return moment().diff(birthday, 'years', false);
      // return moment(birthday).format('DD.MM.YYYY');

      case 'sex':
        return sex;

      case 'city':
        return city;

      default:
        break;
    }
  };

  const changeAnketaItemValue = async ({itemTitle, itemValue}) => {
    navigation.navigate('EditAnketa', {
      category: itemValue,
      categoryText: itemTitle,
    });
  };

  const getAnketaItemValue = itemValue => {
    return anketa?.[itemValue]?.translate;
  };

  const goToSettings = () => {
    navigation.navigate('Profile');
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
    closeSheet();
    console.log('image', image);
    setLocalFile(image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="?????? | ??????????????" />
      <Container>
        {isPhotosLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ccc" />
          </View>
        ) : (
          <ImageGallery imagesArr={photos} />
        )}

        {isAnketaLoading || isAnketaTitlesLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ccc" />
          </View>
        ) : (
          <View style={styles.itemListView}>
            {anketaTitles.map((item, index) => (
              <ListItem
                key={item.id}
                text={item.translate}
                value={getAnketaItemValue(item.value)}
                itemTitle={item.translate}
                itemValue={item.value}
                onPressItem={changeAnketaItemValue}
              />
            ))}
          </View>
        )}
      </Container>

      <ModalWithInput
        modalVisible={modalNameVisible}
        setModalVisible={setModalNameVisible}
        title={translations.PROFILE.MODAL_TITLE_NAME}
        inputValue={inputName}
        setInputValue={setInputName}
        prevState={name}
        inputPlaceholder={translations.PROFILE.MODAL_PLACEHOLDER_NAME}
        onSuccess={updateUser({
          name: inputName,
        })}
      />
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: theme['background-basic-color-1'],
  },
});

export default AnketaScreen;
