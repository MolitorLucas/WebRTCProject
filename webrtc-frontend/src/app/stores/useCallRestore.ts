import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';
import { useEffect } from 'react';



interface CallState {
  socket: Socket | null;
  localStream: MediaStream | null;
  remoteStreams: Map<string, MediaStream>;
  peerConnections: Map<string, RTCPeerConnection>;
  isMuted: boolean;
  isCameraOff: boolean;
  
  setSocket: (socket: Socket) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  addRemoteStream: (userId: string, stream: MediaStream) => void;
  removeRemoteStream: (userId: string) => void;
  addPeerConnection: (userId: string, pc: RTCPeerConnection) => void;
  removePeerConnection: (userId:string) => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  //... outras ações
}

export const useCallStore = create<CallState>((set) => ({
  socket: null,
  localStream: null,
  remoteStreams: new Map(),
  peerConnections: new Map(),
  isMuted: false,
  isCameraOff: false,

  setSocket: (socket) => set({ socket }),
  setLocalStream: (stream) => set({ localStream: stream }),
  
  addRemoteStream: (userId, stream) => set((state) => {
    const newStreams = new Map(state.remoteStreams);
    newStreams.set(userId, stream);
    return { remoteStreams: newStreams };
  }),

  removeRemoteStream: (userId) => set((state) => {
    const newStreams = new Map(state.remoteStreams);
    newStreams.delete(userId);
    return { remoteStreams: newStreams };
  }),
  
  addPeerConnection: (userId, pc) => set((state) => {
    const newPcs = new Map(state.peerConnections);
    newPcs.set(userId, pc);
    return { peerConnections: newPcs };
  }),

  removePeerConnection: (userId) => set((state) => {
    const newPcs = new Map(state.peerConnections);
    newPcs.delete(userId);
    return { peerConnections: newPcs };
  }),

  toggleMute: () => set((state) => ({ isMuted:!state.isMuted })),
  toggleCamera: () => set((state) => ({ isCameraOff:!state.isCameraOff })),
}));


const {setSocket} = useCallStore();

useEffect(() => {
  const newSocket = io('http://localhost:');
  setSocket(newSocket);

  // Lógica para lidar com eventos recebidos do servidor
  // newSocket.on('event-name', (data) => {... });

  return () => {
    newSocket.disconnect();
  };
},);

