"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RecommendationDisplay } from "@/components/recommendation-display"
import { analyzeSymptoms } from "@/lib/actions"
import { Loader2 } from "lucide-react"
import type { ProductRecommendation } from "@/lib/types"

export function SymptomForm() {
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>(null)
  const [skinAnalysis, setSkinAnalysis] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!symptoms.trim()) return

    setIsAnalyzing(true)
    try {
      const result = await analyzeSymptoms(symptoms)
      setRecommendations(result.recommendations)
      setSkinAnalysis(result.analysis)
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Describe Your Skin Concerns</CardTitle>
          <CardDescription>
            Tell us about your skin symptoms, concerns, and goals. The more details you provide, the better our
            recommendations will be.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="Example: I have dry patches on my cheeks and forehead, occasional breakouts on my chin, and my skin feels tight after washing. I'm looking for products that will hydrate without causing more breakouts."
              className="min-h-[150px] resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto bg-teal-600 hover:bg-teal-700" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Personalized Recommendations"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {recommendations && skinAnalysis && (
        <RecommendationDisplay recommendations={recommendations} analysis={skinAnalysis} />
      )}
    </div>
  )
}
