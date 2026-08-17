"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ComponentRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
        const params = useParams();

        const formRef = useRef<HTMLFormElement>(null!);

        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess: (data) => {
                toast.success(`Card "${data.title}" Created`);
                formRef.current?.reset();
            },
            onError: (error) => {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                disableEditing();
            }
        };

        useOnClickOutside(formRef, disableEditing);
        useEventListener("keydown", onKeyDown);

        const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
            e,
        ) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        };

        const onSubmit = (formData: FormData) => {
            const title = formData.get("title") as string;
            const listId = formData.get("listId") as string;
            const boardId = params.boardId as string;

            execute({
                title,
                listId,
                boardId,
            });
        };

        if (isEditing) {
            return (
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="m-1 space-y-4 px-1 py-0.5"
                >
                    <FormTextarea
                        id="title"
                        onKeyDown={onTextareaKeyDown}
                        ref={ref}
                        placeholder="Enter a Title For This Card..."
                        errors={fieldErrors}
                    />

                    <input
                        type="hidden"
                        id="listId"
                        name="listId"
                        defaultValue={listId}
                    />

                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add Card</FormSubmit>

                        <Button
                            type="button"
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <div className="px-2 pt-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
                    size="sm"
                    variant="ghost"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add a Card
                </Button>
            </div>
        );
    },
);

CardForm.displayName = "CardForm";
