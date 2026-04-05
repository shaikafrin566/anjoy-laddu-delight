import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground">Have questions? We'd love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+91 8008144268" },
                { icon: Mail, label: "Email", value: "hello@anjoy.in" },
                { icon: MapPin, label: "Address", value: "Hyderabad, Telangana, India" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{c.label}</p>
                    <p className="text-muted-foreground text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Business Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
                <p>Sunday: 10:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Send a Message</h2>
            <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-card" />
            <Input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-card" />
            <Textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-card" />
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
