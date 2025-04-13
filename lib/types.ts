export interface ProductRecommendation {
  id: string
  name: string
  brand: string
  category: string
  description: string
  price: number
  imageUrl: string
  keyIngredients: string[]
  skinConcerns: string[]
}

export interface AnalysisResult {
  analysis: string
  recommendations: ProductRecommendation[]
}
