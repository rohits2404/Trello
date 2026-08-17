"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@/lib/generated/prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ComponentRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ComponentRef<"button">>(null!);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" Copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({ id, boardId });
    };

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeCopy({ id, boardId });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start"
            >
                <div className="pb-4 text-center text-sm font-medium text-neutral-600">
                    List Actions
                </div>

                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <Button
                    onClick={onAddCard}
                    className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                    variant="ghost"
                    type="button"
                >
                    Add Card...
                </Button>

                <form action={onCopy}>
                    <input type="hidden" name="id" defaultValue={data.id} />

                    <input
                        type="hidden"
                        name="boardId"
                        defaultValue={data.boardId}
                    />

                    <FormSubmit
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                    >
                        Copy List...
                    </FormSubmit>
                </form>

                <Separator />

                <form action={onDelete}>
                    <input type="hidden" name="id" defaultValue={data.id} />

                    <input
                        type="hidden"
                        name="boardId"
                        defaultValue={data.boardId}
                    />

                    <FormSubmit
                        variant="ghost"
                        className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
                    >
                        Delete This List
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
