"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
    const params = useParams();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const onClose = useCardModal((state) => state.onClose);

    const formRef = useRef<HTMLFormElement>(null!);
    const textareaRef = useRef<HTMLTextAreaElement>(null!);

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });

            toast.success(`Card "${data.title}" Updated`);
            disableEditing();
            onClose();
        },

        onError: (error) => {
            toast.error(error);
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({
            id: data.id,
            description,
            boardId,
            title: data.title,
        });
    };

    return (
        <div className="flex w-full items-start gap-x-3">
            <AlignLeft className="mt-0.5 h-5 w-5 shrink-0 text-neutral-700" />

            <div className="min-w-0 flex-1">
                <p className="mb-2 font-semibold text-neutral-700">
                    Description
                </p>

                {isEditing ? (
                    <form action={onSubmit} ref={formRef} className="space-y-2">
                        <FormTextarea
                            id="description"
                            className="mt-2 w-full min-w-0 resize-y"
                            placeholder="Add a more detailed description"
                            defaultValue={data.description || ""}
                            errors={fieldErrors}
                            ref={textareaRef}
                        />

                        <div className="flex items-center gap-x-2">
                            <FormSubmit>Save</FormSubmit>

                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-19.5 rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium wrap-anywhere"
                    >
                        {data.description ||
                            "Add a More Detailed Description..."}
                    </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex w-full items-start gap-x-3">
            <Skeleton className="h-6 w-6 bg-neutral-200" />

            <div className="w-full">
                <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
                <Skeleton className="h-19.5 w-full bg-neutral-200" />
            </div>
        </div>
    );
};
