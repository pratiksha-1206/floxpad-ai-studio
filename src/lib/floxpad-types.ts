export type InputType = "Requirement" | "User Story" | "Use Case" | "Test Case";
export type OutputType = "User Story" | "Use Case" | "Test Case";
export type ModelId = "claude-sonnet" | "claude-opus" | "claude-haiku";

export const MODELS: { id: ModelId; name: string; tagline: string }[] = [
  { id: "claude-sonnet", name: "Claude Sonnet", tagline: "Balanced speed & quality" },
  { id: "claude-opus", name: "Claude Opus", tagline: "Highest reasoning depth" },
  { id: "claude-haiku", name: "Claude Haiku", tagline: "Fastest, most economical" },
];

export const INPUT_TYPES: InputType[] = ["Requirement", "User Story", "Use Case", "Test Case"];
export const OUTPUT_TYPES: OutputType[] = ["User Story", "Use Case", "Test Case"];

export interface GenerationRecord {
  id: string;
  inputType: InputType;
  outputType: OutputType;
  model: ModelId;
  modelName: string;
  source: string;
  output: string;
  durationMs: number;
  createdAt: string;
}