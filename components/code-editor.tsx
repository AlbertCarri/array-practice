"use client"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function CodeEditor({ value, onChange, placeholder }: CodeEditorProps) {
  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-mono text-sm min-h-[200px] resize-none"
        spellCheck={false}
      />
      <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
        JavaScript
      </div>
    </div>
  )
}
