'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Your Name *
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="John Doe"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary-600 transition-colors',
                errors.name
                  ? 'border-red-600'
                  : 'border-gray-200'
              )}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Email Address *
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="john@example.com"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary-600 transition-colors',
                errors.email
                  ? 'border-red-600'
                  : 'border-gray-200'
              )}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Subject *
        </label>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="How can we help?"
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary-600 transition-colors',
                errors.subject
                  ? 'border-red-600'
                  : 'border-gray-200'
              )}
            />
          )}
        />
        {errors.subject && (
          <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-2">
          Message *
        </label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Tell us more about your inquiry..."
              rows={5}
              className={cn(
                'w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-primary-600 transition-colors resize-none',
                errors.message
                  ? 'border-red-600'
                  : 'border-gray-200'
              )}
            />
          )}
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <Icons.CheckCircle size={18} />
          Message sent successfully! We'll get back to you soon.
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          {submitError}
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Icons.Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Icons.Send size={18} />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
