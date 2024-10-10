"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import revalPath from "@/lib/serverActions/revalPath";
import DeleteRequest from "@/lib/requestHelpers/DeleteRequest";

export default function DeleteDialog({type}:{type:"enquiry" | "reorder"}) {

    const handleDelete = async () => {
        try {
            await DeleteRequest(`/customers?type${type}`)
            revalPath("/dashboard")
            toast.success(`All ${type} Customers Deleted`)
        } catch (e) {
            toast.error("Couldn't delete any customers")
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="bg-red-600 rounded-none border-2 border-red-600 hover:text-red-600 hover:bg-transparent py-2 px-4 w-full font-semibold justify-start text-white"
                    >
                        Delete {type} customers
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Are you Sure?
                        </DialogTitle>
                        <DialogDescription>
                            This operation cannot be undone it will delete all the {type} customers
                        </DialogDescription>
                    </DialogHeader>

                    <section className="space-x-2">
                        <DialogClose>
                            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 rounded-md px-4 h-auto text-sm text-white">Yes</Button>
                        </DialogClose>
                        <DialogClose>
                            <span className="bg-green-600 hover:bg-green-700 py-2 text-sm px-4 text-white rounded-md block">No</span>
                        </DialogClose>
                    </section>

                </DialogContent>
            </Dialog>
        </>
    );
}
