import { Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative bg-white py-16 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal-50 to-transparent" />
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-2 bg-teal-50 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <span className="ml-2 text-sm font-medium text-teal-700">AI-Powered Skincare</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Radiance <span className="text-teal-500">AI</span>
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 mb-8">
            Personalized skincare recommendations based on your unique skin concerns and symptoms
          </p>
        </div>
      </div>
    </div>
  )
}
