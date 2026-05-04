import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Journal from "@/pages/journal";
import JournalIssue from "@/pages/journal-issue";
import JournalAdmin from "@/pages/journal-admin";
import Podcasts from "@/pages/podcasts";
import NotFound from "@/pages/not-found";
import PasswordGate from "@/components/PasswordGate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/journal/admin" component={JournalAdmin} />
      <Route path="/journal">
        <PasswordGate><Journal /></PasswordGate>
      </Route>
      <Route path="/journal/vol-:volume/no-:issue">
        <PasswordGate><JournalIssue /></PasswordGate>
      </Route>
      <Route path="/journal/:volume/:issue">
        <PasswordGate><JournalIssue /></PasswordGate>
      </Route>
      <Route path="/podcasts">
        <PasswordGate><Podcasts /></PasswordGate>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
