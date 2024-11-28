import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInputs } from "./sections/BasicInputs";
import { AdvancedComponents } from "./sections/AdvancedComponents";

function ComponentShowcase() {
  return (
    <ScrollArea className="h-screen">
      <div className="container mx-auto py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>ShadCN/UI Components Showcase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <BasicInputs />
            <AdvancedComponents />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

export default ComponentShowcase;