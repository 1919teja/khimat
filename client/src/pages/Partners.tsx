
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Partners() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Partners</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Blue Dart", "DHL", "FedEx", "DTDC", "Delhivery", "Ekart"].map((partner) => (
            <Card key={partner}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{partner}</h3>
                <p className="text-gray-600">
                  Trusted logistics partner providing reliable shipping solutions across India.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
