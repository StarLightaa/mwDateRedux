import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const PLATFORM_CAMERA_PERMISSIONS = {
  ios: null,
  android: PERMISSIONS.ANDROID.CAMERA,
};

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: null,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const REQUEST_PERMISSION_TYPE = {
  camera: PLATFORM_CAMERA_PERMISSIONS,
  location: PLATFORM_LOCATION_PERMISSIONS,
};

const PERMISSION_TYPE = {
  camera: 'camera',
  location: 'location',
};

class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions);
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };

  requestMultiple = async (types): Promise<boolean> => {
    const results = [];
    for (const type of types) {
      const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
      if (permission) {
        const result = await this.requestPermission(permission);
        results.push(result);
      }
    }

    for (const result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  };
}

const Permission = new AppPermission();

export {Permission, PERMISSION_TYPE};