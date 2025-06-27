export default function VideoGrid() {
    return (
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
            <div className="relative col-span-full md:col-span-1 h-96 md:h-[400px] bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay muted loop>
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-man-and-woman-on-a-video-call-51000-large.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">Você</span>
            </div>
            <div className="relative w-full h-48 md:h-[400px] bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay muted loop>
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-smiling-man-in-front-of-a-white-wall-43224-large.mp4" type="video/mp4" />
                </video>
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">LidTiger</span>
            </div>
        </div>
    );
  }