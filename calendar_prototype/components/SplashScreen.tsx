import { LogIn, QrCode } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Logo or Icon */}
        <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center">
          <QrCode className="w-12 h-12 text-blue-500" />
          <div className="absolute -inset-2 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
        </div>

        {/* Company/App Name */}
        <h1 className="text-4xl font-bold tracking-tight">Dev Squad</h1>

        {/* Tagline */}
        <p className="text-xl opacity-80">Your amazing tagline here</p>

        {/* Loading indicator */}
        <div className="mt-8 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[loading_5s_linear_forwards]"></div>
        </div>
      </div>

      {/* Version or copyright */}
      <div className="absolute bottom-6 text-sm opacity-70">
        Version 1.0.0 • © 2024
      </div>
    </div>
  );
}
