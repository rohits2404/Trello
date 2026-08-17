"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constants/images";

import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

interface UnsplashImage {
    id: string;
    width: number;
    height: number;
    urls: {
        thumb: string;
        small: string;
        regular: string;
        full: string;
    };
    links: {
        html: string;
        download_location: string;
    };
    user: {
        name: string;
        username: string;
        links: {
            html: string;
        };
    };
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [images, setImages] = useState<UnsplashImage[]>(
        defaultImages as UnsplashImage[],
    );

    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const fetchImages = async () => {
            try {
                const result = await unsplash.GET("/photos/random", {
                    params: {
                        query: {
                            collections: ["317099"],
                            count: 9,
                            orientation: "landscape",
                            content_filter: "low",
                        },
                    },
                });

                if (result.error || !result.data) {
                    throw new Error("Failed to fetch Unsplash images");
                }

                const newImages = Array.isArray(result.data)
                    ? result.data
                    : [result.data];

                if (mounted) {
                    setImages(newImages as UnsplashImage[]);
                }
            } catch (error) {
                console.error("Failed to fetch Unsplash images:", error);

                if (mounted) {
                    setImages(defaultImages as UnsplashImage[]);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchImages();

        return () => {
            mounted = false;
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="mb-2 grid grid-cols-3 gap-2">
                {images.map((image) => {
                    const isSelected = selectedImageId === image.id;

                    const photographerUrl =
                        `${image.user.links.html}` +
                        "?utm_source=your_app_name&utm_medium=referral";

                    const unsplashUrl =
                        `${image.links.html}` +
                        "?utm_source=your_app_name&utm_medium=referral";

                    return (
                        <label
                            key={image.id}
                            htmlFor={`${id}-${image.id}`}
                            className={cn(
                                "group relative aspect-video cursor-pointer overflow-hidden rounded-sm bg-muted transition",
                                "hover:opacity-75",
                                pending &&
                                    "cursor-auto opacity-50 hover:opacity-50",
                                isSelected && "ring-2 ring-sky-500",
                            )}
                            onClick={() => {
                                if (pending) return;

                                setSelectedImageId(image.id);
                            }}
                        >
                            <input
                                type="radio"
                                id={`${id}-${image.id}`}
                                name={id}
                                value={[
                                    image.id,
                                    image.urls.thumb,
                                    image.urls.full,
                                    image.links.html,
                                    image.user.name,
                                ].join("|")}
                                checked={isSelected}
                                disabled={pending}
                                onChange={() => setSelectedImageId(image.id)}
                                className="sr-only"
                            />

                            <Image
                                src={image.urls.thumb}
                                alt={`Photo by ${image.user.name}`}
                                fill
                                sizes="(max-width: 768px) 33vw, 200px"
                                className="object-cover"
                            />

                            {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <div className="rounded-full bg-sky-600 p-1">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-[10px] text-white">
                                <Link
                                    href={photographerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate hover:underline"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Photo by {image.user.name}
                                </Link>

                                <span className="mx-1">on</span>

                                <Link
                                    href={unsplashUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Unsplash
                                </Link>
                            </div>
                        </label>
                    );
                })}
            </div>

            <FormErrors id={id} errors={errors} />
        </div>
    );
};
