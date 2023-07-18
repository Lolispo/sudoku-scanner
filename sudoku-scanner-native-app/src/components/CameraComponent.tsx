import React, { useEffect, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { View, Text, Button } from 'react-native';

const CameraComponent = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'authorized') {
        setHasCameraPermission(true);
      } else if (cameraPermission === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (newCameraPermission === 'authorized') {
          console.log('Access granted!');
          setHasCameraPermission(true);
        } else {
          console.log('@checkPermissions new camera permissions', newCameraPermission);
          setHasCameraPermission(false);
        }
      } else {
        console.log('@checkPermissions camera permissions', cameraPermission);
        setHasCameraPermission(false);
      }
    };

    checkPermissions();
  }, []); // executed once since empty dependency array

  
  const renderFunction = () => {
    if (hasCameraPermission === null) {
      return <Text>Checking camera permissions...</Text>;
    }
  
    if (hasCameraPermission === false) {
      return <Text>No camera access</Text>;
    }
  
    if (device == null) {
      return <Text>Unable to find device</Text>;
    }
  
    return (
      <View>
        Hello world from Camera Component
        <Camera device={device} isActive={true} />
        {/* Additional UI or camera controls */}
      </View>
    );  
  }

  return renderFunction();
};

export default CameraComponent;
