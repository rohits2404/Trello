"use client";

import { create, type State } from "@/actions/create-board";
import { useActionState } from "react";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";

export const Form = () => {
    const initialState: State = {
        message: "",
        errors: {},
    };

    const [state, dispatch] = useActionState(create, initialState);

    return (
        <form action={dispatch}>
            <div className="flex flex-col space-y-2">
                <FormInput errors={state.errors} />
            </div>

            <FormButton />
        </form>
    );
};
