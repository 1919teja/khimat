
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    title: "1. Enter Shipment Details",
    description: "Simply enter your pickup and delivery locations, along with package dimensions and weight. Our system will use this information to find the best shipping options for you.",
    icon: "📦"
  },
  {
    title: "2. Compare Options",
    description: "Get instant quotes from multiple logistics providers. Compare prices, delivery times, and services side by side to make an informed decision.",
    icon: "💹"
  },
  {
    title: "3. AI Recommendations",
    description: "Our advanced AI analyzes your requirements and provides personalized recommendations based on reliability, cost-effectiveness, and delivery speed.",
    icon: "🤖"
  },
  {
    title: "4. Book Your Shipment",
    description: "Once you've found the perfect option, proceed with booking. Our streamlined process ensures a hassle-free shipping experience.",
    icon: "✅"
  }
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h1>
        <div className="space-y-6">
          {steps.map((step) => (
            <Card key={step.title}>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <span className="text-4xl mr-4">{step.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
