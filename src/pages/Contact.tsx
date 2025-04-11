import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import SEO from '@/components/SEO';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  subject: z.string().min(2, {
    message: "Please enter a subject",
  }),
  message: z.string().min(10, {
    message: "Your message should be at least 10 characters long",
  }),
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message. Please try again later.');
      }

      toast({
        title: "Sent!",
        description: "I'll get back to you as soon as possible.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      form.reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact • Las Vegas Web Developer & Graphic Artist"
        description="Ready to start your next project? Get in touch with carpedtm, a Las Vegas-based web designer and graphic artist. Let's create something unique."
        keywords="contact Las Vegas web designer, Las Vegas creative agency contact, affordable web design Las Vegas, custom website design consultation, Las Vegas digital branding services, Las Vegas UX/UI designer contact, Las Vegas creative portfolio designer, Las Vegas visual artist contact"
      />
      <div className="container mx-auto px-4 md:px-8 pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              Contact Me
            </h1>
            <p className="text-base md:text-lg tracking-tight leading-relaxed text-muted-foreground max-w-md mt-6">
              You can find me at <strong>info.carpedtm@gmail.com</strong>.
            </p>
          </div>

          <div className="flex justify-start mb-8 overflow-x-auto md:overflow-visible border-t border-b border-border py-4">
            <div className="flex space-x-8">
              <span className="text-sm uppercase tracking-widest">Form</span>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-l border-border">
            <div className="col-span-2 border-r border-b border-border p-2 md:p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Name" 
                              className="border-0 border-b border-border rounded-none focus-visible:ring-0 px-0 h-12 text-base bg-transparent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email" 
                              className="border-0 border-b border-border rounded-none focus-visible:ring-0 px-0 h-12 text-base bg-transparent"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                    
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Subject" 
                            className="border-0 border-b border-border rounded-none focus-visible:ring-0 px-0 h-12 text-base bg-transparent"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Message" 
                            className="min-h-[160px] border-0 border-b border-border rounded-none focus-visible:ring-0 px-0 resize-none text-base bg-transparent aria-[invalid=true]:border-destructive"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    
                  <Button
                    type="submit"
                    className="group relative bg-transparent border border-foreground text-foreground px-6 py-3 h-auto rounded-none text-xs tracking-wider w-fit overflow-hidden focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none hover:bg-transparent hover:border-foreground"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <span className="absolute inset-0 w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;