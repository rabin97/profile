import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from "motion/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const HireMeForm = () => {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const { handleSubmit, formState: { isSubmitting } } = form;

    const onSubmit = async (data: FormData) => {
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            form.reset();
        } catch {
            setSubmitStatus('error');
        } finally {
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'hello@yourname.com',
            href: 'mailto:hello@yourname.com'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+1 (555) 123-4567',
            href: 'tel:+15551234567'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'San Francisco, CA',
            href: 'https://maps.google.com'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/yourprofile',
            href: 'https://linkedin.com/in/yourprofile'
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'github.com/yourusername',
            href: 'https://github.com/yourusername'
        },
        {
            icon: Globe,
            label: 'Portfolio',
            value: 'yourportfolio.com',
            href: 'https://yourportfolio.com'
        }
    ];

    return (
        <div className="min-h-screen ">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-xl p-2 py-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                        <div className="space-y-1">
                            {contactInfo.map((info) => {
                                const IconComponent = info.icon;
                                return (
                                    <a
                                        key={info.label}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : undefined}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <IconComponent className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {info.label}
                                            </p>
                                            <p className="text-gray-600 text-sm">{info.value}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>

                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your full name" {...field} />
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
                                            <FormLabel>Email Address *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your.email@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What's this about?" {...field} />
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
                                            <FormLabel>Message *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell me about your project or opportunity..."
                                                    rows={6}
                                                    className="resize-vertical"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <motion.div
                                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-6 text-white font-medium transition-all shadow-lg hover:shadow-xl"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </div>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </motion.div>

                                {/* Status Messages */}
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                                    >
                                        <p className="text-green-800 font-medium">✅ Message sent successfully! I'll get back to you soon.</p>
                                    </motion.div>
                                )}

                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 border border-red-200 rounded-lg"
                                    >
                                        <p className="text-red-800 font-medium">
                                            ❌ Something went wrong. Please try again or contact me directly.
                                        </p>
                                    </motion.div>
                                )}
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HireMeForm;