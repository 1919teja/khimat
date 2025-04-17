
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <Textarea placeholder="How can we help you?" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-blue-600">support@shipcompare.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-blue-600">+91 98765 43210</p>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Logistics Hub<br />
                    Tech Park, Bengaluru<br />
                    Karnataka, India 560001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
