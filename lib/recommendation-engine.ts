import type { ProductRecommendation, AnalysisResult } from "./types"

class RecommendationEngine {
  private keywordMap: Record<string, string[]> = {
    dry: ["hydrating", "moisturizing", "hyaluronic acid", "ceramides", "dry skin"],
    dehydrated: ["hydrating", "hyaluronic acid", "water-based", "dehydrated skin"],
    oily: ["oil-free", "non-comedogenic", "salicylic acid", "oily skin"],
    acne: ["salicylic acid", "benzoyl peroxide", "tea tree", "acne-prone"],
    sensitive: ["fragrance-free", "hypoallergenic", "soothing", "sensitive skin"],
    aging: ["retinol", "peptides", "antioxidants", "anti-aging", "fine lines"],
    dull: ["vitamin c", "exfoliating", "brightening", "dull skin"],
    redness: ["soothing", "calming", "centella", "redness"],
    pigmentation: ["niacinamide", "vitamin c", "brightening", "dark spots"],
    combination: ["balanced", "combination skin"],
  }

  private concernPatterns: Record<string, RegExp> = {
    dry: /\b(dry|flaky|tight|dehydrated)\b/i,
    oily: /\b(oily|greasy|shiny)\b/i,
    acne: /\b(acne|pimple|breakout|blemish|zit)\b/i,
    sensitive: /\b(sensitive|irritation|react|redness)\b/i,
    aging: /\b(aging|wrinkle|fine line|sagging|mature)\b/i,
    dull: /\b(dull|tired|glow|radiance|bright)\b/i,
    pigmentation: /\b(dark spot|hyperpigmentation|uneven tone|melasma)\b/i,
    combination: /\b(combination|t-zone)\b/i,
  }

  public analyzeAndRecommend(symptoms: string, catalog: ProductRecommendation[]): AnalysisResult {
    // Identify skin concerns from symptoms
    const concerns = this.identifyConcerns(symptoms)

    // Generate analysis text
    const analysis = this.generateAnalysis(concerns, symptoms)

    // Find matching products
    const recommendations = this.findMatchingProducts(concerns, catalog)

    return {
      analysis,
      recommendations,
    }
  }

  private identifyConcerns(symptoms: string): string[] {
    const concerns: string[] = []

    for (const [concern, pattern] of Object.entries(this.concernPatterns)) {
      if (pattern.test(symptoms)) {
        concerns.push(concern)
      }
    }

    // If no concerns were identified, default to "combination"
    if (concerns.length === 0) {
      concerns.push("combination")
    }

    return concerns
  }

  private generateAnalysis(concerns: string[], symptoms: string): string {
    // In a real application, this would use an LLM or similar technology
    // For the prototype, we'll use templates

    let analysis = "Based on your description, it appears you have "

    if (concerns.length === 1) {
      analysis += `${concerns[0]} skin. `
    } else if (concerns.length === 2) {
      analysis += `${concerns[0]} and ${concerns[1]} skin. `
    } else {
      const lastConcern = concerns.pop()
      analysis += `${concerns.join(", ")}, and ${lastConcern} skin. `
    }

    // Add specific advice based on concerns
    if (concerns.includes("dry")) {
      analysis += "Your skin would benefit from hydrating ingredients like hyaluronic acid and ceramides. "
    }

    if (concerns.includes("oily")) {
      analysis += "Look for oil-free, non-comedogenic products that won't clog your pores. "
    }

    if (concerns.includes("acne")) {
      analysis += "Ingredients like salicylic acid and benzoyl peroxide can help manage breakouts. "
    }

    if (concerns.includes("sensitive")) {
      analysis += "Opt for fragrance-free, gentle formulations to minimize irritation. "
    }

    analysis += "We've selected products specifically formulated to address these concerns."

    return analysis
  }

  private findMatchingProducts(concerns: string[], catalog: ProductRecommendation[]): ProductRecommendation[] {
    // Create a set of keywords to look for based on identified concerns
    const keywordsToMatch: Set<string> = new Set()

    concerns.forEach((concern) => {
      const keywords = this.keywordMap[concern] || []
      keywords.forEach((keyword) => keywordsToMatch.add(keyword.toLowerCase()))
    })

    // Score each product based on how well it matches the concerns
    const scoredProducts = catalog.map((product) => {
      let score = 0

      // Check if product targets any of the identified skin concerns
      product.skinConcerns.forEach((concern) => {
        if (concerns.includes(concern)) {
          score += 3
        }
      })

      // Check if product description or ingredients match keywords
      keywordsToMatch.forEach((keyword) => {
        if (product.description.toLowerCase().includes(keyword)) {
          score += 1
        }

        product.keyIngredients.forEach((ingredient) => {
          if (ingredient.toLowerCase().includes(keyword)) {
            score += 2
          }
        })
      })

      return { product, score }
    })

    // Sort by score (highest first) and take top 3-6 products
    scoredProducts.sort((a, b) => b.score - a.score)

    // Ensure we have a diverse set of product categories
    const categories = new Set<string>()
    const recommendations: ProductRecommendation[] = []

    for (const { product } of scoredProducts) {
      if (recommendations.length >= 6) break

      // If we already have 3+ products, only add more if they're from new categories
      if (recommendations.length >= 3 && categories.has(product.category)) {
        continue
      }

      recommendations.push(product)
      categories.add(product.category)
    }

    return recommendations
  }
}

export const recommendationEngine = new RecommendationEngine()
