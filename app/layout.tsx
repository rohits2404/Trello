import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Flowdeck",
    description:
        "Turn ideas into action with effortless task management, collaborative boards, and focused workflows.",
    icons: {
        icon: "/logo.svg",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <ClerkProvider>
                    <QueryProvider>
                        <Toaster />
                        <ModalProvider />
                        <TooltipProvider>{children}</TooltipProvider>
                    </QueryProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
