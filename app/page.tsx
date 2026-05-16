"use client";

import Link from "next/link";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #09090b, #111827)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 30,
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        AI Business Assistant Platform
      </h1>

      <p
        style={{
          fontSize: 20,
          color: "#a1a1aa",
          maxWidth: 700,
          marginBottom: 40,
          lineHeight: 1.6,
        }}
      >
        Automate customer management, AI workflows,
        analytics, emails, and business operations
        using one intelligent platform.
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              style={{
                padding: "16px 28px",
                background: "#2563eb",
                borderRadius: 14,
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Go to Dashboard
            </Link>

            <UserButton />
          </>
        ) : (
          <>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </>
        )}
      </div>
    </div>
  );
}