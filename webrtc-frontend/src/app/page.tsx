import VideoGrid from './components/VideoGrid';
import Controls from './components/Controls';

export default function Home() { 
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex flex-col flex-1">
        <VideoGrid />
        <Controls />
      </div>
    </div>
  );
}