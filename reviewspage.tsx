import { getAllReviews } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";
import { RatingStars } from "@/components/operators/rating-stars";
import { format } from "date-fns";

export default function AdminReviewsPage() {
  const reviews = getAllReviews();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Moderation</CardTitle>
        <CardDescription>Approve or reject user-submitted reviews.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map(review => {
              const avatar = placeholderImages.find(p => p.id === review.avatarId);
              const status = Math.random() > 0.5 ? 'approved' : 'pending';
              return (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={review.author} />}
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{review.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <RatingStars rating={review.ratings.overall} size={16} />
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {review.comment}
                  </TableCell>
                   <TableCell className="hidden lg:table-cell">{format(new Date(review.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700">
                            <CheckCircle className="h-3.5 w-3.5"/>
                            Approve
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive">
                            <XCircle className="h-3.5 w-3.5"/>
                            Reject
                        </Button>
                    </div>
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
