"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import {
  CONTENT_AUDIENCES,
  CONTENT_TONES,
  type ContentAudience,
} from "../lib/types";

type PackageMetadataFormProps = {
  title: string;
  audience: ContentAudience;
  tone: string;
  topic: string;
  tagsInput: string;
  onTitleChange: (value: string) => void;
  onAudienceChange: (value: ContentAudience) => void;
  onToneChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onTagsChange: (value: string) => void;
};

export function PackageMetadataForm({
  title,
  audience,
  tone,
  topic,
  tagsInput,
  onTitleChange,
  onAudienceChange,
  onToneChange,
  onTopicChange,
  onTagsChange,
}: PackageMetadataFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="pkg-title">Package title</Label>
        <Input
          id="pkg-title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Fed week buyer briefing"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pkg-audience">Audience</Label>
        <Select
          id="pkg-audience"
          value={audience}
          onChange={(event) =>
            onAudienceChange(event.target.value as ContentAudience)
          }
        >
          {CONTENT_AUDIENCES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pkg-tone">Tone</Label>
        <Select
          id="pkg-tone"
          value={tone}
          onChange={(event) => onToneChange(event.target.value)}
        >
          {CONTENT_TONES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
          {!CONTENT_TONES.includes(tone as (typeof CONTENT_TONES)[number]) && (
            <option value={tone}>{tone}</option>
          )}
        </Select>
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="pkg-topic">Topic</Label>
        <Input
          id="pkg-topic"
          value={topic}
          onChange={(event) => onTopicChange(event.target.value)}
          placeholder="Fed & rate policy"
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="pkg-tags">Tags (comma-separated)</Label>
        <Input
          id="pkg-tags"
          value={tagsInput}
          onChange={(event) => onTagsChange(event.target.value)}
          placeholder="fed, buyer, puget-sound"
        />
      </div>
    </div>
  );
}
