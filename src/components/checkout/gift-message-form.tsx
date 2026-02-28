"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { generateCustomGiftMessage } from "@/ai/flows/generate-custom-gift-message";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const messageTemplates = [
  { label: "Birthday", message: "Happy Birthday! Wishing you a day filled with love and laughter. Hope you love this cuddly gift!" },
  { label: "Anniversary", message: "Happy Anniversary! Another year of making beautiful memories together. Here's to many more!" },
  { label: "New Baby", message: "Congratulations on your new arrival! May your home be filled with joy and sweet snuggles." },
  { label: "Get Well", message: "Sending you huge hugs and well wishes. Get well soon and enjoy your new fuzzy friend!" },
  { label: "Just Because", message: "Thought you could use a little extra cuddle today. Enjoy!" },
];

export function GiftMessageForm() {
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [sender, setSender] = useState("");

  const handlePersonalize = async () => {
    if (!recipient || !occasion) return;

    setIsGenerating(true);
    try {
      const result = await generateCustomGiftMessage({
        recipient,
        occasion,
        sender: sender || undefined,
      });
      setCustomMessage(result.message);
    } catch (error) {
      console.error("Failed to generate message:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (value: string) => {
    const template = messageTemplates.find(t => t.label === value);
    if (template) {
      setCustomMessage(template.message);
      setOccasion(template.label);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gift-wrap"
              checked={isGiftWrapped}
              onCheckedChange={(checked) => setIsGiftWrapped(Boolean(checked))}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="gift-wrap"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Gift wrap this item
              </label>
              <p className="text-xs text-muted-foreground">
                We'll wrap your gift in beautiful paper for your loved one.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">Personal Gift Message</CardTitle>
              <CardDescription>Write a heartfelt note to your loved one.</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePersonalize}
              disabled={isGenerating || !recipient || !occasion}
              className="gap-2"
            >
              <Wand2 className={`h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
              {isGenerating ? 'Generating...' : 'Personalize with AI'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">To (Recipient)</label>
              <Input
                placeholder="Name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">From (Sender - Optional)</label>
              <Input
                placeholder="Your Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select a template or occasion</label>
            <div className="flex gap-2">
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Choose a message template..." />
                </SelectTrigger>
                <SelectContent>
                  {messageTemplates.map((template) => (
                    <SelectItem key={template.label} value={template.label}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Or type occasion..."
                className="w-1/3"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Message</label>
            <Textarea
              placeholder="Type your personal message here..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {customMessage.length} characters
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
