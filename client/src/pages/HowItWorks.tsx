
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h1>
        <div className="space-y-6">
          {[
            {
              title: "1. Enter Shipment Details",
              description: "Provide the pickup and delivery locations, package dimensions, and weight."
            },
            {
              title: "2. Compare Options",
              description: "Get instant quotes from multiple logistics providers with detailed breakdowns."
            },
            {
              title: "3. AI Recommendations",
              description: "Our AI analyzes the best options based on your specific requirements."
            },
            {
              title: "4. Book Your Shipment",
              description: "Select your preferred option and proceed with the booking."
            }
          ].map((step) => (
            <Card key={step.title}>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
