"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("mdsiambabu537@gmail.com");
  const [password, setPassword] = useState("Siam@2025");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <label className="form-label">
        Email Address
      </label>

      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <label className="form-label">
        Password
      </label>

      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <button
        className="login-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: 16,
          fontSize: 13,
          color: "#64748b",
        }}
      >
        Demo Login:
        <br />
        <b>mdsiambabu537@gmail.com</b>
        <br />
        Password: <b>Siam@2025</b>
      </p>
    </form>
  );
}