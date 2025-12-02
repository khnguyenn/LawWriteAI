"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { supabase } from "@/utils/supabase";
import { Spinner } from "./ui/spinner";

export function SignUpForm() {
  const [formData, setFormData] = useState({
    studentMacId: "",
    studentFullName: "",
    studentEmail: "",
    studentPassword: "",
    studentConfirmPassword: "",
    termsAccepted: false,
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errorMsg) {
      setErrorMsg("");
    }
  };

  const validateForm = () => {
    const fail = (message: string) => {
      setErrorMsg(message);
      toast.error(message);
      return false;
    };

    if (formData.studentMacId.length !== 8) {
      return fail("Student Macquarie University ID must be 8 characters long");
    }
    if (!formData.studentFullName.length) {
      return fail("Student full name is required");
    }
    if (!formData.studentEmail.length) {
      return fail("Student email is required");
    }
    if (!formData.studentPassword.length) {
      return fail("Student password is required");
    }
    if (!formData.studentConfirmPassword.length) {
      return fail("Student confirm password is required");
    }
    if (formData.studentPassword !== formData.studentConfirmPassword) {
      return fail("Student password and confirm password do not match");
    }
    if (!formData.termsAccepted) {
      return fail("You must accept the terms and conditions");
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.studentEmail,
      password: formData.studentPassword,
    });

    if (error) {
      setErrorMsg(error.message);
      toast.error(`Sign up failed: ${error.message}`);
      setIsLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setIsLoading(false);
      setErrorMsg("Failed to create user");
      return;
    }

    // Create pro5 for user
    const { error: profileError } = await supabase.from("student").insert({
      id: user.id, // same as auth.users.id
      studentMacID: Number(formData.studentMacId),
      studentName: formData.studentFullName,
    });

    setIsLoading(false);

    if (profileError) {
      setIsLoading(false);
      setErrorMsg(
        "Signed up, but failed to create profile: " + profileError.message
      );
      toast.error(
        `Profile creation failed: ${profileError.message}. Please contact support.`
      );
      return;
    }

    toast.success("Sign up successful!!");
    router.push("/home");
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to sign up to your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="password">Student ID</FieldLabel>
            <Input
              id="studentId"
              type="text"
              value={formData.studentMacId}
              onChange={(e) =>
                setFormData({ ...formData, studentMacId: e.target.value })
              }
              required
              placeholder="Enter your Macquarie University ID"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              type="text"
              value={formData.studentFullName}
              onChange={(e) =>
                setFormData({ ...formData, studentFullName: e.target.value })
              }
              required
              placeholder="Enter your full name"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={formData.studentEmail}
              onChange={(e) =>
                setFormData({ ...formData, studentEmail: e.target.value })
              }
              required
              placeholder="Enter your Macquarie University email address"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={formData.studentPassword}
              onChange={(e) =>
                setFormData({ ...formData, studentPassword: e.target.value })
              }
              required
              placeholder="Enter your password"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.studentConfirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  studentConfirmPassword: e.target.value,
                })
              }
              required
              placeholder="Confirm your password"
            />
          </Field>

          <Field>
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms-2"
                className="data-[state=checked]:bg-deep-red data-[state=checked]:border-deep-red"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    termsAccepted: Boolean(checked),
                  })
                }
              />
              <div className="grid gap-2">
                <Label htmlFor="terms-2">Accept terms and conditions</Label>
                <p className="text-muted-foreground text-sm">
                  By clicking this checkbox, you agree to the terms and
                  conditions.
                </p>
              </div>
            </div>
          </Field>
          <Field>
            <Button
              type="submit"
              className="bg-deep-red"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </Button>
          </Field>
          <FieldSeparator></FieldSeparator>
          <Field>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/login">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
