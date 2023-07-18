'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useChat } from "ai/react";

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    const renderMessage = (message: any) => {
        let avatarFallbackText = "";
        let avatarImageUrl = "";

        if (message.role === "user") {
            avatarFallbackText = "LM";
            avatarImageUrl = "https://github.com/LucasOMuryllo.png";
        } else if (message.role === "assistant") {
            avatarFallbackText = "RS";
            avatarImageUrl = "https://github.com/rocketseat.png";
        }

        return (
            <div key={message.id} className="flex gap-3 text-slate-600 text-sm mt-4">
                {message.role === "user" || message.role === "assistant" ? (
                    <Avatar>
                        <AvatarFallback>{avatarFallbackText}</AvatarFallback>
                        <AvatarImage src={avatarImageUrl} />
                    </Avatar>
                ) : null}
                <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700">
                        {message.role === "user" ? "Usuário" : "AI"}
                    </span>
                    {message.content}
                </p>
            </div>
        );
    };

    return (
        <Card className="w-[440px]">
            <CardHeader>
                <CardTitle>Chat AI</CardTitle>
                <CardDescription>Using Vercel SDK to create a chat bot.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] w-full pr-4">
                    {messages.map((message) => renderMessage(message))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                    <Input
                        placeholder="How can I help you?"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardFooter>
        </Card>
    );
}
