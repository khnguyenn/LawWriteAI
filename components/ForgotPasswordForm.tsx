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

export function ForgotPasswordForm() {
  const [studentId, setStudentId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: studentData, error: studentError } = await supabase
      .from("student")
      .select("*")
      .eq("studentMacID", studentId)
      .single();
    if (studentError) {
      setErrorMsg(studentError.message);
      toast.error("Student ID not found");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: studentData.studentEmail,
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
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to reset your password
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
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              required
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>

          <Field>
            <Button
              type="submit"
              className="bg-mq-red hover:bg-mq-red/90 cursor-pointer"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Reset Password"}
            </Button>
          </Field>
          <FieldSeparator></FieldSeparator>
          <Field>
            <FieldDescription className="px-6 text-center">
              Don't have an account? <Link href="/signup">Back</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
