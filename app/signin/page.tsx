"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserType {
  email: string;
  name: string;
  password: string;
  signUp: boolean;
}

function Page() {
  const [user, setUser] = useState<UserType>({
    email: "",
    name: "",
    password: "",
    signUp: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (user.signUp) {
        const result = await authClient.signUp.email({
          email: user.email,
          name: user.name,
          password: user.password,
        });

        if (result.error) {
          setError(result.error.message || "Could not create account.");
          return;
        }

        router.push("/");
      } else {
        const result = await authClient.signIn.email({
          email: user.email,
          password: user.password,
        });

        if (result.error) {
          setError(result.error.message || "Could not sign in.");
          return;
        }

        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check the server and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <h1>{user.signUp ? "Sign Up" : "Sign In"}</h1>

      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
        required
      />

      {user.signUp && (
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          required
        />
      )}

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
        required
      />

      <label>
        <input
          type="checkbox"
          checked={user.signUp}
          onChange={(e) =>
            setUser({ ...user, signUp: e.target.checked })
          }
        />
        Sign up
      </label>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default Page;