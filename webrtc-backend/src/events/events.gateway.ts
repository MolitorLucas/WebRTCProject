import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private static rooms: Map<string, Set<string>> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    EventsGateway.rooms.forEach((users, roomId) => {
      if (users.has(client.id)) {
        users.delete(client.id);
        client.to(roomId).emit('user-left', { userId: client.id });
      }
    });
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { roomId } = data;
    client.join(roomId);

    if (!EventsGateway.rooms.has(roomId)) {
      EventsGateway.rooms.set(roomId, new Set());
    }
    EventsGateway.rooms.get(roomId)?.add(client.id);
    client.to(roomId).emit('user-joined', { userId: client.id });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const { roomId } = data;
    client.leave(roomId);

    if (EventsGateway.rooms.has(roomId)) {
      EventsGateway.rooms.get(roomId)?.delete(client.id);
      client.to(roomId).emit('user-left', { userId: client.id });
    }
  }

  @SubscribeMessage('webrtc-offer')
  handleWebrtcOffer(
    @MessageBody() data: { to: string; offer: RTCSessionDescriptionInit },
    @ConnectedSocket() client: Socket,
  ): void {
    client
      .to(data.to)
      .emit('webrtc-offer', { from: client.id, offer: data.offer });
  }

  @SubscribeMessage('webrtc-answer')
  handleWebrtcAnswer(
    @MessageBody() data: { to: string; answer: RTCSessionDescriptionInit },
    @ConnectedSocket() client: Socket,
  ): void {
    client
      .to(data.to)
      .emit('webrtc-answer', { from: client.id, answer: data.answer });
  }

  @SubscribeMessage('webrtc-ice-candidate')
  handleWebrtcIceCandidate(
    @MessageBody() data: { to: string; candidate: RTCIceCandidateInit },
    @ConnectedSocket() client: Socket,
  ): void {
    client.to(data.to).emit('webrtc-ice-candidate', {
      from: client.id,
      candidate: data.candidate,
    });
  }
}
