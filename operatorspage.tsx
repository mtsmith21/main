import { getOperators } from "@/lib/data";
import { OperatorList } from "@/components/operators/operator-list";

export const metadata = {
  title: "Operators - Rate My Operator",
  description: "Browse and search for private jet operators.",
};

export default function OperatorsPage() {
  const operators = getOperators();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Operator Directory
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find, compare, and review the world's leading private jet operators.
        </p>
      </div>
      <OperatorList operators={operators} />
    </div>
  );
}
