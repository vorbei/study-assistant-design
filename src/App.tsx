import { useEffect, useState } from "react";
import { DesignPage } from "./pages/design";
import { ComponentsPage } from "./pages/components";
import { IconsPage } from "./pages/icons";
import { ExamplesPage } from "./pages/examples";
import { Toaster } from "@/components/ui/toaster";
import { Nav } from "@/components/ui/nav";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("#design");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#design';
      setCurrentPath(hash);
      
      if (!hash) {
        window.history.replaceState(null, '', '#design');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const getContent = () => {
    const path = currentPath.split('/')[0];
    switch (path) {
      case '#design':
        return <DesignPage />;
      case '#components':
        return <ComponentsPage />;
      case '#icons':
        return <IconsPage />;
      case '#examples':
        return <ExamplesPage />;
      default:
        return <DesignPage />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-8">
      <Nav currentPath={currentPath} />
      <main className="">
        {getContent()}
      </main>
      <Toaster />
    </div>
  );
}