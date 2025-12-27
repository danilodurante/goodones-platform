"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, X } from "lucide-react";
import { Select } from "@/components/ui/select";


export default function DesignSystemPage() {
  const [email, setEmail] = React.useState("Scrivi qualcosa...");
  const [bio, setBio] = React.useState("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-12 space-y-14">
        <header className="space-y-3">
          <h1 className="text-5xl font-semibold tracking-tight">Design System</h1>
          <p className="text-lg text-muted-foreground">
            Demo Input / Textarea – varianti con icone, error, counter e disabled.
          </p>
        </header>

        {/* -------------------- INPUT -------------------- */}
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight">Input</h2>

          <div className="space-y-6">
            <Input
              label="Default"
              placeholder="demo@goodones.ai"
              helperText="Inserisci un indirizzo valido."
            />

            <Input
              label="Search"
              placeholder="Cerca..."
              leftIcon={<Search />}
            />

            <Input
              label="Email con clear"
              placeholder="Scrivi qualcosa..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rightIcon={<X />}
              onRightIconClick={() => setEmail("")}
              helperText="Clicca la X per pulire."
            />

            <Input
              label="Email error"
              placeholder="demo@goodones.ai"
              leftIcon={<Mail />}
              errorText="Email non valida."
            />

            <Input
              label="Disabled"
              placeholder="Non editabile"
              disabled
              helperText="Campo disabilitato."
            />
          </div>
        </section>

        {/* -------------------- TEXTAREA -------------------- */}
        <section className="space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight">Textarea</h2>

          <div className="space-y-6">
            <Textarea
              label="Textarea base"
              placeholder="Scrivi qualcosa..."
            />

            <Textarea
              label="Textarea con counter"
              placeholder="Max 160 caratteri…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              showCounter
              helperText="Testo con conteggio caratteri."
            />

            <Textarea
              label="Textarea error"
              placeholder="Scrivi qualcosa..."
              errorText="Testo non valido."
            />

            <Textarea
              label="Textarea disabled"
              placeholder="Non editabile"
              disabled
              helperText="Campo disabilitato."
            />
          </div>
        </section>

<h2 className="mt-10 text-2xl font-semibold">Select</h2>

<div className="mt-6 space-y-6 max-w-xl">
  <Select label="Select base" helperText="Scegli un'opzione">
    <option value="">Seleziona…</option>
    <option value="a">Opzione A</option>
    <option value="b">Opzione B</option>
  </Select>

  <Select
    label="Select error"
    errorText="Selezione non valida"
  >
    <option value="">Seleziona…</option>
    <option value="a">Opzione A</option>
  </Select>

  <Select label="Select disabled" disabled>
    <option>Disabilitato</option>
  </Select>
</div>

      </section>
    </main>
  );
}

