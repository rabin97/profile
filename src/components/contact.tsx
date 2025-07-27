'use client'

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
import { sendContactEmail } from '@/actions/contact';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().min(1, "Email is required").email({ message: "Please enter a valid email address." }),
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

    const onSubmit = async (formData: FormData) => {
        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                setSubmitStatus('success');
                form.reset();
            } else {
                setSubmitStatus('error');
                console.error('Failed to send email:', result.message);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting form:', error);
        } finally {
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'rabinkarmakar947@gmail.com',
            href: 'mailto:rabinkarmakar947@gmail.com'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 8967873860',
            href: 'tel:+918967873860'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Bankura, West Bengal',
            href: '#contact' // No direct link for location, just a placeholder
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'rabin-642894219',
            href: 'https://www.linkedin.com/in/rabin-642894219/'
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'rabin97',
            href: 'https://github.com/rabin97'
        },
        {
            icon: Globe,
            label: 'Portfolio',
            value: 'portfolio',
            href: '#about' // No direct link for portfolio, just a placeholder
        }
    ];

    return (
        <div className="grid lg:grid-cols-2 w-full gap-12 ">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-2 py-6 w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-roboto">Contact Info</h2>
                <div className="space-y-1">
                    {contactInfo.map((info) => {
                        const IconComponent = info.icon;
                        return (
                            <a
                                key={info.label}
                                href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="flex items-center space-x-4 max-md:p-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
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
            <div className="bg-white rounded-2xl shadow-sm p-8">
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
                                className="w-full cursor-pointer py-4 px-6 text-white font-medium transition-all shadow-lg hover:shadow-xl"
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
                                <p className="text-green-800 font-medium">✅ Message sent successfully! I&apos;ll get back to you soon.</p>
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
    );
};

export default HireMeForm;