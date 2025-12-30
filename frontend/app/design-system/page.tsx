"use client";

import * as React from "react";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

// Icons
import { Search } from "lucide-react";

export default function DesignSystemPage() {
  // Input
  const [email, setEmail] = React.useState("");

  // Select
  const [country, setCountry] = React.useState("");

  // Radio
  const [radio, setRadio] = React.useState("it");

  // Switch
  const [airplane, setAirplane] = React.useState(false);
  const [notifications, setNotifications] = React.useState(false);

  // Button loading
  const [loadingA, setLoadingA] = React.useState(false);
  const [loadingB, setLoadingB] = React.useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-8 py-16 space-y-24">
        {/* ===================== */}
        {/* HEADER */}
        {/* ===================== */}
        <header className="space-y-3">
          <h1 className="text-5xl font-semibold tracking-tight">
            Design System
          </h1>
        </header>

        {/* ===================== */}
        {/* INPUT */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-5xl font-semibold">Input</h2>

          <Input label="Search" placeholder="Search..." leftIcon={<Search />} />

          <Input
            label="Email"
            placeholder="Write something..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rightIcon="clear"
            onRightIconClick={() => setEmail("")}
          />

          <Input
            label="Email (error)"
            value="demo@goodones.ai"
            errorText="Invalid email."
            leftIcon="email"
          />

          <Input label="Disabled" placeholder="disabled" disabled />
        </section>

        {/* ===================== */}
        {/* TEXTAREA */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-5xl font-semibold">Textarea</h2>

          <Textarea
            placeholder="Write a message..."
            helperText="Example helper text."
          />

          <Textarea
            placeholder="Max 140 characters..."
            maxLength={140}
            showCounter
          />

          <Textarea
            placeholder="Write a message..."
            errorText="Required field."
          />
	          
        </section>

        {/* ===================== */}
        {/* SELECT */}
        {/* ===================== */}
        <section className="space-y-10 mb-12">
          <h2 className="text-5xl font-semibold">Select</h2>

          {/* Default (padding-bottom creates safe area when dropdown is open) */}
          <div className="space-y-2 pb-28">
            <p className="text-sm text-muted-foreground">Country</p>

            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="us">USA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Disabled */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Country (disabled)</p>

            <Select value="it" onValueChange={() => {}} disabled>
              <SelectTrigger className="w-full" disabled>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="it">Italy</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="us">USA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* ===================== */}
        {/* CHECKBOX */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-5xl font-semibold">Checkbox</h2>

          <div className="space-y-4 text-sm">
            <label className="flex items-center gap-3">
              <Checkbox />
              Accept terms and conditions
            </label>

            <label className="flex items-center gap-3">
              <Checkbox defaultChecked />
              Checked by default
            </label>

            <label className="flex items-center gap-3 text-muted-foreground">
              <Checkbox disabled />
              Disabled
            </label>

            <label className="flex items-center gap-3 text-muted-foreground">
              <Checkbox defaultChecked disabled />
              Disabled + checked
            </label>
          </div>
        </section>

        {/* ===================== */}
        {/* RADIO */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-5xl font-semibold">Radio</h2>

          <RadioGroup
            value={radio}
            onValueChange={setRadio}
            className="space-y-4 text-sm"
          >
            <label className="flex items-center gap-3">
              <RadioGroupItem value="it" />
              Italy
            </label>

            <label className="flex items-center gap-3">
              <RadioGroupItem value="uk" />
              UK
            </label>

            <label className="flex items-center gap-3 text-muted-foreground">
              <RadioGroupItem value="us" disabled />
              USA (disabled)
            </label>
          </RadioGroup>
        </section>

        {/* ===================== */}
        {/* SWITCH */}
        {/* ===================== */}
        <section className="space-y-6">
          <h2 className="text-5xl font-semibold">Switch</h2>

          <div className="space-y-4 text-sm">
            <label className="flex items-center gap-4">
              <Switch checked={airplane} onCheckedChange={setAirplane} />
              Airplane mode
            </label>

            <label className="flex items-center gap-4">
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
              Notifications
            </label>

            <label className="flex items-center gap-4 text-muted-foreground">
              <Switch disabled />
              Disabled
            </label>
          </div>
        </section>

        {/* ===================== */}
        {/* BUTTON */}
        {/* ===================== */}
        <section className="space-y-10">
          <h2 className="text-5xl font-semibold">Button</h2>

          {/* Variants */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Variants</p>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">States</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button disabled>Disabled</Button>

              <Button
                loading={loadingA}
                onClick={() => {
                  setLoadingA(true);
                  window.setTimeout(() => setLoadingA(false), 1200);
                }}
              >
                Loading
              </Button>

              <Button
                variant="outline"
                loading={loadingB}
                onClick={() => {
                  setLoadingB(true);
                  window.setTimeout(() => setLoadingB(false), 1200);
                }}
              >
                Loading
              </Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Full width */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Full width</p>
            <Button className="w-full">Primary full width</Button>
            <Button variant="secondary" className="w-full">
              Secondary full width
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

