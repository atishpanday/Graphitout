export default function Banner() {
    return (
        <div className="w-full h-400 p-6 flex justify-between items-center bg-white shadow-md">
            <div className="h-full">
                <p className="text-8xl font-bold text-blue-500">Graphitout</p>
                <p className="text-4xl font-bold text-gray-400">Create beautiful graphs in just a few clicks!</p>
            </div>
            <div className="h-full flex">
                <iframe
                    src="https://lottie.host/embed/8a3b642d-2173-49e8-9181-d48c26d516f8/l5WiYG13fO.json"
                    height={"100%"}
                    width={"100%"}
                />
            </div>
        </div>
    );
};