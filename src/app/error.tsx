"use client";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/basics/button";

function ErrorPage({ reset }: { reset?: () => void }) {
  const { refresh } = useRouter();

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      refresh();
    }
  };

  return (
    <section className="flex items-center justify-center flex-col h-dvh text-destructive">
      <TriangleAlert className="size-12" />
      <span className="mt-2">Something Went's Wrong</span>
      <Button className="mt-4" onClick={handleReset}>
        Reload Page
      </Button>
    </section>
  );
}

export default ErrorPage;
