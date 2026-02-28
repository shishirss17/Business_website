import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
                <p className="text-muted-foreground">
                    Have a question about our products or need help with an order? Send us a message and we'll reply as soon as we can.
                </p>
            </div>
            <ContactForm />
        </div>
    );
}
