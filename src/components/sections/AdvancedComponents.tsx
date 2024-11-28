import { ChevronLeft, ChevronRight, Upload as UploadIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

const demoData = [
  { id: 1, name: "Item 1", status: "Active" },
  { id: 2, name: "Item 2", status: "Pending" },
  { id: 3, name: "Item 3", status: "Inactive" },
];

export function AdvancedComponents() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Advanced Components</h2>
      
      {/* Table */}
      <div className="space-y-2">
        <Label>Table</Label>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Tags/Badges */}
      <div className="space-y-2">
        <Label>Tags/Badges</Label>
        <div className="space-x-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Label>Progress</Label>
        <Progress value={60} className="w-full" />
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <Label>Upload</Label>
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <Button variant="outline">Choose File</Button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="space-y-2">
        <Label>Pagination</Label>
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}