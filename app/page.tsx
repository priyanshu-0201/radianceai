import { SymptomForm } from "@/components/symptom-form"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeroSection />
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <SymptomForm />
      </div>
    </main>
  )
}
