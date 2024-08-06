import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'react-camera-pro';

import './styles.css';

type Props = {
	onTakePhoto: (photo: string | null) => {};
};

export default function PhotoCamera(props: Props) {
	const { onTakePhoto } = props;
	const [numberOfCameras, setNumberOfCameras] = useState(0);
	const [image, setImage] = useState<string | null>(null);
	const [showImage, setShowImage] = useState<boolean>(false);
	const camera = useRef<CameraType>(null);
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
	const [torchToggled, setTorchToggled] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoDevices = devices.filter((i) => i.kind == 'videoinput');
			setDevices(videoDevices);
		})();
	});

	return (
		<div className="container">
			<div
				id="top-left"
				className="corner"
			></div>
			<div
				id="top-right"
				className="corner"
			></div>
			<div
				id="bottom-right"
				className="corner"
			></div>
			<div
				id="bottom-left"
				className="corner"
			></div>
			<div className="wrapper">
				{showImage ? (
					<div
						className="fullScreenImagePreview"
						style={{ backgroundImage: image ? `url(${image})` : '' }}
						onClick={() => {
							setShowImage(!showImage);
						}}
					/>
				) : (
					<Camera
						ref={camera}
						aspectRatio={'cover'}
						facingMode="environment"
						numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
						videoSourceDeviceId={activeDeviceId}
						errorMessages={{
							noCameraAccessible:
								'No camera device accessible. Please connect your camera or try a different browser.',
							permissionDenied: 'Permission denied. Please refresh and give camera permission.',
							switchCamera:
								'It is not possible to switch camera to different one because there is only one video device accessible.',
							canvas: 'Canvas is not supported.'
						}}
						videoReadyCallback={() => {
							console.log('Video feed ready.');
						}}
					/>
				)}
				<button
					className="takePhotoButton"
					onClick={() => {
						if (camera.current) {
							const photo = camera.current.takePhoto();
							setImage(photo as string);
							onTakePhoto(photo as string);
							setShowImage(true);
						}
					}}
				></button>
				{/*<div className="control">
         <select
          onChange={(event) => {
            setActiveDeviceId(event.target.value);
          }}
        > 
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))}
        </select>*/}
				{/* <div
          className="imagePreview"
          style={{ backgroundImage: image ? `url(${image})` : '' }}
          onClick={() => {
            setShowImage(!showImage);
          }}
        /> */}

				{/* {camera.current?.torchSupported && (
          <button
            className={`torchButton ${torchToggled ? 'toggled' : ''}`}
            onClick={() => {
              if (camera.current) {
                setTorchToggled(camera.current.toggleTorch());
              }
            }}
          />
        )} */}
				{/* <button
          className="changeFacingCameraButton"
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        /> 
      </div>*/}
			</div>
		</div>
	);
}
