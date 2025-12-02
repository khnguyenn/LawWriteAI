"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { Spinner } from "./ui/spinner";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";

export function LoginForm() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: studentId,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (data?.session) {
      toast.success("Signed in successfully!!");
      router.push("/home");
    }

    setIsLoading(false);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to sign in to your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="password">Student ID</FieldLabel>
            <Input
              id="studentId"
              type="text"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your Macquarie University ID."
            />
          </Field>
          <div className="relative">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Button
              type="button"
              variant="ghost"
              className="absolute right-0 top-0 translate-y-4 h-full hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Field>
            <FieldDescription className="px-6 text-center">
              Forgot your password?{" "}
              <Link href="/forgot-password" className="text-deep-red">
                Reset password
              </Link>
            </FieldDescription>
          </Field>

          <Field>
            <Button
              type="submit"
              className="bg-deep-red"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </Button>
          </Field>
          <FieldSeparator></FieldSeparator>
          <Field>
            <FieldDescription className="px-6 text-center">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
