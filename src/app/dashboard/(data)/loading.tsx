import Spinner from "@/components/ui/Spinner";

export default function loading() {
  return (
    <div className="space-between flex h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}
