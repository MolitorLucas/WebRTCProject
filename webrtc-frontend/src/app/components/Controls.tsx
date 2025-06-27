'use client';
import { useState, useEffect } from 'react'; // Adicionado useEffect aqui
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
import { useCallStore } from '../stores/useCallRestore'; // Ajuste o caminho conforme a estrutura do seu projeto

export default function Controls() {
    const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
    const [isCameraOff, setIsCameraOff] = useState<boolean>(false);

    // Exemplo do useeffect da seção 4.2.1
    const { setLocalStream } = useCallStore();

    useEffect(() => {
        const startMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setLocalStream(stream);
            } catch (error) {
                console.error('Erro ao acessar mídia:', error);
                // Lidar com erros específicos aqui
            }
        };

        startMedia();
    }, [setLocalStream]); // Adicionado setLocalStream como dependência para evitar warnings

    const toggleMic = () => {
        setIsMicMuted(!isMicMuted);
    };

    const toggleCamera = () => {
        setIsCameraOff(!isCameraOff);
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

            <button className="p-3 bg-red-600 rounded-full hover:bg-red-700 transition duration-200">
                <PhoneXMarkIcon className="h-6 w-6 text-white" />
            </button>

            <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200">
                <Cog6ToothIcon className="h-6 w-6 text-white" />
            </button>
        </div>
    );
}