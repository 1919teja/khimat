import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Partners from "@/pages/Partners";
import HowItWorks from "@/pages/HowItWorks";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/partners" component={Partners} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
