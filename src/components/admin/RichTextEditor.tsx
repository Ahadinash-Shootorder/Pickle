"use client";

import dynamic from "next/dynamic";
import { Field } from "./ui";

const Editor = dynamic(() => import("react-simple-wysiwyg"), { ssr: false });

type Props = {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  hint?: string;
};

export default function RichTextEditor({ value, onChange, label, hint }: Props) {
  return (
    <Field
      label={label || "Write your content"}
      hint={hint || "Use the toolbar to make text bold, add paragraphs, etc."}
    >
      <Editor value={value} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}
