import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProductRecommendation } from "@/lib/types"
import Image from "next/image"

interface RecommendationDisplayProps {
  recommendations: ProductRecommendation[]
  analysis: string
}

export function RecommendationDisplay({ recommendations, analysis }: RecommendationDisplayProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <Card className="border-gray-200 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-2xl">Your Skin Analysis</CardTitle>
          <CardDescription>Based on the symptoms you've described</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{analysis}</p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((product) => (
            <Card key={product.id} className="border-gray-200 shadow-sm h-full">
              <CardContent className="p-0">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardContent>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.brand}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.keyIngredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
