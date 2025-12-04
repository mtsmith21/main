import { getOperatorById, getReviewsForOperator } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ReviewCard } from "@/components/operators/review-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";

export const metadata = {
  title: "My Profile - Rate My Operator",
};

export default function ProfilePage() {
    const user = { name: 'Alex Johnson', email: 'alex.j@example.com', avatarId: 'user-avatar-1' };
    const userReviews = [
        ...getReviewsForOperator('netjets'),
        ...getReviewsForOperator('vistajet')
    ].filter(r => r.author === user.name);
    
    const userAvatar = placeholderImages.find(p => p.id === user.avatarId);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
             <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Change Avatar</Button>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="font-headline text-3xl font-bold mb-6">My Reviews ({userReviews.length})</h2>
        {userReviews.length > 0 ? (
          <div className="space-y-8">
            {userReviews.map(review => {
                const operator = getOperatorById(review.id.split('-')[1]);
                return (
                    <div key={review.id}>
                        <h3 className="text-lg font-semibold mb-2">Review for {operator?.name}</h3>
                        <ReviewCard review={review} />
                    </div>
                )
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't written any reviews yet.</p>
        )}
      </div>
    </div>
  );
}
