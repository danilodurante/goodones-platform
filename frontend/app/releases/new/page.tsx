"use client";

import * as React from "react";

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

/* -------------------------------------------------
   Debug flag (from .env.local)
-------------------------------------------------- */
const SHOW_DEBUG =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_SHOW_DEBUG === "true";

export default function NewReleasePage() {
  /* -------------------------------------------------
     Mounted (hydration-safe)
  -------------------------------------------------- */
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------------------------------------
     Step 1 — Release info
  -------------------------------------------------- */
  const [artistName, setArtistName] = React.useState("");
  const [releaseTitle, setReleaseTitle] = React.useState("");
  const [country, setCountry] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState("draft");
  const [notes, setNotes] = React.useState("");

  /* -------------------------------------------------
     Step 2 — Links & assets
  -------------------------------------------------- */
  const [streamingLink, setStreamingLink] = React.useState("");
  const [pressFolderLink, setPressFolderLink] = React.useState("");
  const [artworkLink, setArtworkLink] = React.useState("");
  const [privateNotes, setPrivateNotes] = React.useState("");

  /* -------------------------------------------------
     UI state
  -------------------------------------------------- */
  const [isSaving, setIsSaving] = React.useState(false);

  const canSave =
    artistName.trim() !== "" && releaseTitle.trim() !== "";

  /* -------------------------------------------------
     Build payload (shared)
  -------------------------------------------------- */
  const buildPayload = () => ({
    artistName: artistName || null,
    releaseTitle: releaseTitle || null,
    country,
    status,
    notes: notes || null,
    links: {
      streaming: streamingLink || null,
      pressFolder: pressFolderLink || null,
      artwork: artworkLink || null,
    },
    privateNotes: privateNotes || null,
    meta: {
      schemaVersion: 1,
    },
  });

  /* -------------------------------------------------
     Actions
  -------------------------------------------------- */
  const handleCancel = () => {
    setArtistName("");
    setReleaseTitle("");
    setCountry(null);
    setStatus("draft");
    setNotes("");
    setStreamingLink("");
    setPressFolderLink("");
    setArtworkLink("");
    setPrivateNotes("");
  };

  const handleSave = () => {
    if (!canSave) return;

    setIsSaving(true);

    const payload = {
      ...buildPayload(),
      meta: {
        ...buildPayload().meta,
        createdAtLocalISO: new Date().toISOString(),
      },
    };

    console.log("RELEASE PAYLOAD", payload);

    window.setTimeout(() => {
      setIsSaving(false);
    }, 900);
  };

  /* -------------------------------------------------
     Render
  -------------------------------------------------- */
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-8 py-16 space-y-12">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-5xl font-semibold tracking-tight">
            New release
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a release draft. (Local state only)
          </p>
        </header>

        {/* Form */}
        <section className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Release info</h2>

            <Input
              label="Artist name"
              placeholder="e.g. Makaya McCraven"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />

            <Input
              label="Release title"
              placeholder="e.g. In These Times"
              value={releaseTitle}
              onChange={(e) => setReleaseTitle(e.target.value)}
            />

            {/* Country */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Country / Territory
              </p>
              <Select value={country ?? ""} onValueChange={setCountry}>
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

            {/* Status */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Notes for the campaign, press angles, links..."
              helperText="Optional. Keep it short and actionable."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-input" />

          {/* Step 2 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Links & assets</h2>

            <Input
              label="Streaming link"
              placeholder="https://open.spotify.com/..."
              value={streamingLink}
              onChange={(e) => setStreamingLink(e.target.value)}
            />

            <Input
              label="Press folder link"
              placeholder="https://drive.google.com/..."
              value={pressFolderLink}
              onChange={(e) => setPressFolderLink(e.target.value)}
            />

            <Input
              label="Artwork link"
              placeholder="https://..."
              value={artworkLink}
              onChange={(e) => setArtworkLink(e.target.value)}
            />

            <Textarea
              placeholder="Private notes (internal only)..."
              helperText="Optional. Not shared externally."
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              type="button"
              loading={isSaving}
              disabled={!canSave || isSaving}
              onClick={handleSave}
            >
              Save draft
            </Button>
          </div>
        </section>

        {/* Debug (hydration-safe) */}
        {SHOW_DEBUG && mounted && (
          <section className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Payload preview (live)
            </p>
            <pre className="rounded-md border border-input bg-background p-4 text-xs overflow-auto">
{JSON.stringify(buildPayload(), null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}

