import type { InputType, OutputType, ModelId } from "./floxpad-types";

// Local artifact transformer used to evaluate Claude prompts.
// Swap with a Claude API call by replacing the body of `generateArtifact`.
export async function generateArtifact(params: {
  source: string;
  inputType: InputType;
  outputType: OutputType;
  model: ModelId;
}): Promise<string> {
  const { source, inputType, outputType, model } = params;
  // Simulate model latency that scales with size and tier.
  const tierDelay = model === "claude-opus" ? 1400 : model === "claude-sonnet" ? 800 : 450;
  const sizeDelay = Math.min(source.length / 4, 800);
  await new Promise((r) => setTimeout(r, tierDelay + sizeDelay));

  const trimmed = source.trim() || "(empty input)";
  const summary = trimmed.split(/\s+/).slice(0, 14).join(" ");
  const stamp = new Date().toLocaleString();

  const header = `# ${outputType} generated from ${inputType}\n\n> Source summary: ${summary}${trimmed.length > 80 ? "…" : ""}\n> Generated: ${stamp}\n\n`;

  if (outputType === "User Story") {
    return (
      header +
      `## Story\nAs a **product user**, I want to ${deriveGoal(trimmed)} so that I can realize the value described in the source ${inputType.toLowerCase()}.\n\n` +
      `## Acceptance Criteria\n` +
      `- Given the preconditions implied by the ${inputType.toLowerCase()}\n` +
      `- When the user performs the primary action\n` +
      `- Then the system delivers the expected outcome\n\n` +
      `## Notes\nDerived from source content. Refine wording with stakeholders.`
    );
  }

  if (outputType === "Use Case") {
    return (
      header +
      `## Use Case: ${titleCase(summary)}\n\n` +
      `**Primary Actor:** End User\n**Goal:** ${deriveGoal(trimmed)}\n**Preconditions:** User is authenticated and authorized.\n\n` +
      `### Main Flow\n1. User initiates the action described in the ${inputType.toLowerCase()}.\n2. System validates inputs.\n3. System executes the core behavior.\n4. System confirms success to the user.\n\n` +
      `### Alternate Flows\n- 2a. Validation fails → display contextual error.\n- 3a. Downstream service unavailable → queue retry and notify user.\n\n` +
      `**Postconditions:** Outcome is persisted and audit-logged.`
    );
  }

  // Test Case
  return (
    header +
    `## Test Case: Verify ${titleCase(summary)}\n\n` +
    `**Type:** Functional\n**Priority:** High\n\n` +
    `### Preconditions\n- System is in a known good state\n- Test user has required permissions\n\n` +
    `### Steps\n1. Navigate to the relevant module\n2. Provide the inputs implied by the ${inputType.toLowerCase()}\n3. Trigger the primary action\n4. Observe the system response\n\n` +
    `### Expected Result\nThe system fulfills the behavior described in the source ${inputType.toLowerCase()} without errors, and state changes are persisted correctly.\n\n` +
    `### Negative Scenarios\n- Invalid input is rejected with a clear message\n- Unauthorized access is denied`
  );
}

function deriveGoal(text: string): string {
  const lower = text.toLowerCase();
  const verbs = ["create", "view", "update", "delete", "manage", "configure", "approve", "submit", "track"];
  const hit = verbs.find((v) => lower.includes(v));
  return hit ? `${hit} the described capability` : "achieve the described outcome";
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}