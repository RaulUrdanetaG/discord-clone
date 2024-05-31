import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-indigo-400 h-full">{children}</div>;
}
