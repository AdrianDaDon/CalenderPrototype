"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Github } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
        <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login" className="">Login</TabsTrigger>
            <TabsTrigger value="signup" className="">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="">
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login" className={""}>Email</Label>
                  <Input id="email-login" type="email" placeholder="your@email.com" required className="" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-login" className={""}>Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={""}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" variant="default" size="default">
                  Login
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="">
            <form>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="">First name</Label>
                    <Input id="first-name" className="" type="text" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="">Last name</Label>
                    <Input id="last-name" type="text" placeholder="Doe" required className="" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup" className={""}>Email</Label>
                  <Input id="email-signup"  className={""} type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className={""}>Password</Label>
                  <div className="relative">
                    <Input
                      id="password-signup"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className=""
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" variant="default" size="default">
                  Create Account
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" size="default" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-xs text-center text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </div>
      </CardFooter>
    </Card>
  )
}

export default AuthForm;