"use server"

import { revalidatePath } from "next/cache"
import { skincareCatalog } from "./skincare-data"
import type { AnalysisResult } from "./types"
import { recommendationEngine } from "./recommendation-engine"

export async function analyzeSymptoms(symptoms: string): Promise<AnalysisResult> {
  // In a real application, this would call an AI service or ML model
  // For the prototype, we'll use our simple recommendation engine

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const result = recommendationEngine.analyzeAndRecommend(symptoms, skincareCatalog)

  // Revalidate the path to ensure fresh data
  revalidatePath("/")

  return result
}
