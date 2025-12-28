"use client";

import Button from "../components/Button";

export default function GuestbookForm() {
  const handleClick = () => {
    window.parent.postMessage({
      type: 'openWindow',
      windowConfig: {
        id: 'guestbook-sign',
        title: 'Sign Guestbook',
        src: '/guestbook-sign',
        className: 'w-[60vw] h-[75vh] max-w-150 max-h-155',
        type: 'app'
      }
    }, '*');
  };

  return (
    <div className="mb-8">
      <Button onClick={handleClick} size="lg">
        Sign me!
      </Button>
    </div>
  );
}
