import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useCallStore } from './useCallRestore';

//...
const { setSocket } = useCallStore();

useEffect(() => {
  const token = localStorage.getItem('jwt'); // Obter o token de autenticação
  const newSocket = io('http://localhost:3001', {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  setSocket(newSocket);

  // Lógica para lidar com eventos recebidos do servidor
// Dentro da lógica de criação de uma conexão de par
peerConnection.onnegotiationneeded = async () => {
  try {
    // Lógica de proteção contra glare (usando um sinalizador 'makingOffer')
    //...

    await peerConnection.setLocalDescription();
    
    // Enviar a oferta para o par remoto através do servidor de sinalização
    socket.emit('webrtc-offer', {
      to: remoteUserId,
      offer: peerConnection.localDescription,
    });
  } catch (err) {
    console.error(err);
  } finally {
    // Resetar o sinalizador 'makingOffer'
  }
};


  // newSocket.on('event-name', (data) => {... });

  return () => {
    newSocket.disconnect();
  };
},);