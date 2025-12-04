import { getOperators } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function AdminOperatorsPage() {
  const operators = getOperators();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Operators</CardTitle>
          <CardDescription>Manage your list of private jet operators.</CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Operator
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Headquarters</TableHead>
              <TableHead className="hidden md:table-cell">Reviews</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operators.map(operator => {
              const logo = placeholderImages.find(p => p.id === operator.logoId);
              return (
                <TableRow key={operator.id}>
                  <TableCell className="hidden sm:table-cell">
                    {logo && (
                        <Image
                            alt={`${operator.name} logo`}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={logo.imageUrl}
                            width="64"
                        />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{operator.name}</TableCell>
                  <TableCell>{operator.hq}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{operator.reviews.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
