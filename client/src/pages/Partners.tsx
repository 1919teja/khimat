
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const partners = [
  {
    name: "Blue Dart",
    description: "Leading integrated transportation and distribution company in South Asia.",
    logo: "https://placehold.co/100x50",
  },
  {
    name: "DHL",
    description: "Global leader in logistics, specializing in international shipping and courier services.",
    logo: "https://placehold.co/100x50",
  },
  {
    name: "FedEx",
    description: "Worldwide shipping and delivery services with advanced tracking solutions.",
    logo: "https://placehold.co/100x50",
  },
  {
    name: "DTDC",
    description: "Premier express courier service with extensive network across India.",
    logo: "https://placehold.co/100x50",
  },
  {
    name: "Delhivery",
    description: "Tech-enabled logistics and supply chain services company.",
    logo: "https://placehold.co/100x50",
  },
  {
    name: "Ekart",
    description: "Leading e-commerce logistics and supply chain company in India.",
    logo: "https://placehold.co/100x50",
  }
];

export default function Partners() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Logistics Partners</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner.name}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <img src={partner.logo} alt={partner.name} className="mr-4" />
                  <h3 className="text-xl font-semibold">{partner.name}</h3>
                </div>
                <p className="text-gray-600">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
