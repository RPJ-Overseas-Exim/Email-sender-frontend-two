import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Customer } from "@/lib/types/dataEditor/dataEditor";
import { LuCopy } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function ViewCustomer({ customer }: { customer: Customer }) {
  return (
    <Dialog>
      <DialogTrigger>
        <button
          type="button"
          className="w-full p-2 text-left text-sm hover:bg-muted"
        >
          <span>View Customer</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{customer.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="w-full md:w-[70%]">
              <label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground"
              >
                Email
              </label>
              <p id="email" className="flex items-center gap-2">
                {customer.email}&nbsp;
                <button
                  title="copy email"
                  onClick={(e) => navigator.clipboard.writeText(customer.email)}
                  className="inline-block rounded-sm border border-foreground p-1 text-base text-foreground"
                >
                  <LuCopy />
                </button>
              </p>
            </div>

            <div className="w-full md:w-[20%]">
              <label
                htmlFor="product"
                className="text-xs font-bold text-muted-foreground"
              >
                Product
              </label>
              <p id="product" className="flex items-center gap-2 capitalize">
                {customer.productId}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            {customer?.number && (
              <div className="w-full md:w-[70%]">
                <label
                  htmlFor="number"
                  className="text-xs font-bold text-muted-foreground"
                >
                  Number
                </label>
                <p id="number" className="flex items-center gap-2 capitalize">
                  {customer.number}
                </p>
              </div>
            )}

            <div className="w-full md:w-[20%]">
              <label
                htmlFor="number"
                className="text-xs font-bold text-muted-foreground"
              >
                Status
              </label>
              <p
                id="number"
                className={cn(
                  "flex w-fit items-center gap-2 rounded-sm border px-2",
                  customer.status === "pending"
                    ? "border-red-600 text-red-600"
                    : "border-green-600 text-green-600",
                )}
              >
                {customer.status}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
