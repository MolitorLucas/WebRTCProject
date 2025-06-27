'use client';

import { useState } from 'react';
import {
    MicrophoneIcon,
    VideoCameraIcon,
    ComputerDesktopIcon,
    PhoneXMarkIcon,
    SpeakerWaveIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/solid';

import {
    VideoCameraSlashIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/24/outline';

export default function Controls() {
    const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
    const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
    const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
    const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);

    const toggleMic = () => {
        setIsMicMuted(!isMicMuted);
    };

    const toggleCamera = () => {
        setIsCameraOff(!isCameraOff);
    };

    const toggleScreenShare = () => {
        setIsSharingScreen(!isSharingScreen);
    };

    const toggleSpeaker = () => {
        setIsSpeakerMuted(!isSpeakerMuted);
    };

    return (
        <div className="bg-gray-800 p-4 flex justify-center items-center space-x-6 border-t border-gray-700">
            <button
                onClick={toggleMic}
                className={`p-3 rounded-full transition duration-200 ${isMicMuted ? 'bg-white hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
            >
                {isMicMuted ? (
                    <MicrophoneIcon className="h-6 w-6 text-gray-900" />
                ) : (
                    <MicrophoneIcon className="h-6 w-6 text-white" />
                )}
            </button>

            <button
                onClick={toggleCamera}
                className={`p-3 rounded-full transition duration-200 ${isCameraOff ? 'bg-white hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
            >
                {isCameraOff ? (
                    <VideoCameraSlashIcon className="h-6 w-6 text-gray-900" />
                ) : (
                    <VideoCameraIcon className="h-6 w-6 text-white" />
                )}
            </button>

            <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-full transition duration-200 ${isSharingScreen ? 'bg-white hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
            >
                <ComputerDesktopIcon className={`h-6 w-6 ${isSharingScreen ? 'text-gray-900' : 'text-white'}`} />
            </button>

            <button className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition duration-200">
                <PhoneXMarkIcon className="h-6 w-6 text-white" />
            </button>

            <button
                onClick={toggleSpeaker}
                className={`p-3 rounded-full transition duration-200 ${isSpeakerMuted ? 'bg-white hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
            >
                {isSpeakerMuted ? (
                    <SpeakerXMarkIcon className="h-6 w-6 text-gray-900" />
                ) : (
                    <SpeakerWaveIcon className="h-6 w-6 text-white" />
                )}
            </button>

            <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200">
                <Cog6ToothIcon className="h-6 w-6 text-white" />
            </button>
        </div>
    );
}