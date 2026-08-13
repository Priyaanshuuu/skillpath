// Minimal local shim so this file type-checks and runs outside Framer's
// canvas (e.g. in this Next.js app). When pasting this component into
// Framer, change the import in courseSection.tsx to:
//   import { addPropertyControls, ControlType } from "framer"
// and delete this file — Framer provides the real implementation.

export const ControlType = {
    String: "string",
    Color: "color",
} as const

export function addPropertyControls(
    _component: unknown,
    _controls: Record<string, unknown>
): void {
    // no-op outside Framer's canvas
}
