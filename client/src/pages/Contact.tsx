
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-4">
                  Have questions about our logistics comparison service? We're here to help!
                </p>
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <a href="mailto:support@shipcompare.com" className="text-blue-600 hover:underline">
                      support@shipcompare.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Office Location</h2>
                <p className="text-gray-600">
                  123 Logistics Hub<br />
                  Tech Park, Bengaluru<br />
                  Karnataka, India 560001
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
