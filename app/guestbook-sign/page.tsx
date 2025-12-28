"use client";

import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

export default function GuestbookSign() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState({ name: false, message: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      message: !message.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.message) {
      return;
    }

    const date = new Date().toISOString();

    let body = `**Name:** ${name}\n\n**Date:** ${date}\n\n`;
    if (website.trim()) {
      body += `**Website:** ${website}\n\n`;
    }
    body += `**Message:**\n${message}`;

    const url = new URL(`https://github.com/rao107/rao107.github.io/issues/new`);
    url.searchParams.set('title', `Guestbook Entry from ${name}`);
    url.searchParams.set('body', body);
    url.searchParams.set('labels', 'guestbook');
    url.searchParams.set('assignees', 'rao107');

    window.open(url.toString(), '_blank');

    setName("");
    setMessage("");
    setWebsite("");
    setErrors({ name: false, message: false });
  };

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
      <PageHeader
        title="Sign the Guestbook"
        description="You need a GitHub account to sign the guestbook. Your message will be submitted as a new issue in the repository."
      />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="name"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: false });
              }}
              placeholder="Your name"
              type="text"
              maxLength={50}
              error={errors.name}
            />

            <FormInput
              id="website"
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website or social media link"
              type="url"
              optional
            />

            <FormInput
              id="message"
              label="Message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors({ ...errors, message: false });
              }}
              placeholder="Leave a message..."
              multiline
              rows={5}
              maxLength={300}
              error={errors.message}
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
