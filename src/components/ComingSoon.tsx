export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-4">About Us</h1>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🚧</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            We&apos;re working hard to bring you amazing content about our team,
            mission, and values. Stay tuned for something special!
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm">
          We&apos;re excited to share our story with you soon!
        </p>
      </div>
    </div>
  );
}
