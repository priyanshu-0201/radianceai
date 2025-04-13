import { type NextRequest, NextResponse } from "next/server"
import { skincareCatalog } from "@/lib/skincare-data"
import { recommendationEngine } from "@/lib/recommendation-engine"

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms || typeof symptoms !== "string") {
      return NextResponse.json({ error: "Invalid request. Symptoms must be provided as a string." }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Process the symptoms and generate recommendations
    const result = recommendationEngine.analyzeAndRecommend(symptoms, skincareCatalog)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 })
  }
}
