---
trigger: always_on
---

---
trigger: always_on
---

### 1. General Engineering & Code Practices
* **Consistency & Compatibility:** Always follow existing code practices, reuse existing resources (utils, engines, components, shared modules), maintain style consistency, and preserve backwards compatibility.
* **Naming Conventions:** Use semantic variable names instead of contractions. All variables, functions, comments, and identifiers must be written in **English**.
* **Default Parameters:** Use `=` to set default parameter values whenever a default is needed.
* **Imports Organization:** Imports must always be placed at the beggining of the file, organized strictly by native/built-in modules, external libraries, project shared/global modules, and local domain imports, ordered alphabetically within each group.
* **Standard Adherence:** For new code insertions and updates, match the standard used in the target file (responses, pagination, naming conventions, re-utilized code) to keep the codebase clean and maintainable.
* **Refactoring Strategy:** Prioritize reusing old coding styles during updates rather than altering architectural paradigms to prevent breaking dependencies and dependents.
* **Architecture Discretion:** Avoid mentioning obvious architectural structures in PR descriptions and changelogs when no modifications are made to them.
* **Execution Constraint:** No testing or script execution unless explicitly requested. Stick strictly to reading, writing, and reviewing code and documentation.

---

### 2. Code-First Approach & Terminal Policy
* **Code-First UI & Configs:** Visual changes (UI styling, Tailwind classes, component props) and configuration or infrastructure updates (`next.config.js`, `tailwind.config.ts`, `.env`, docker files, etc.) must be executed exclusively via direct source code editing. The terminal must **never** be used for visual or configuration interventions.
* **Terminal Restriction & Escalation:** The terminal is a last resort. Restrict its usage strictly to operations without code alternatives, such as running builds/compilations, test suites, package installations/removals (`npm install`), or container initializations. DO This strictly upon request or in case what is being asked need this, let this clear in the implementation plan.
* **Mandatory Clarification (Anti-Ambiguity):** If a prompt is vague, incomplete, or lacks critical context (e.g., *"change this button color to blue"* without specifying the component, file, or route), **do not guess, assume, or run terminal commands**. Stop and ask a direct clarifying question for the missing context before modifying any files.

---

### 3. Architecture, Services & Error Handling
* **Error Handling:** Error handling for database operations and services must be handled via standardized exception handlers (`handle_db_exceptions` and `handle_service_exceptions`, or framework equivalents).
* **Service Decomposition:** For long and/or complicated service or component logic, break it down into modular utils. If response assembly requires more than a simple database or data row readout, use a factory pattern (including response de-structuring and assembly) (same applies for API responses).

---

### 4. Documentation & Generated Docs (`/generated_docs/`)
* **Folder Structure:** Organize generated docs in subfolders categorized by months and weeks (e.g., `Jul-26/week-1`) to facilitate navigation. Save files for each route changed (except patch notes, which are limited to one per day).
* **Changes Explained (`/changes_explained`):** Provide brief explanations of changes made compared to the original code so changes are easily understood. Only generate when explicitly requested.
* **Patch Notes (`/patch_notes`):** Keep patch notes in Portuguese with a brief summary and bullet point explanations for code changes. When a patch note is required for a specific commit or branch, write it to a file prefixed with `PR-Name-of-branch.md`, assuming it covers changes from that commit onwards to the most recent. Write patch notes in a concise TL/DR style.
* **Route Docs (`/routes`):** Follow the `modelo_rota` model, documenting route names with their respective HTTP method (e.g., `POST sign-in`). Only generate when requested.

---

### 5. Code Quality & Formatting
* **Docstrings:** All new or refactored utility functions require a concise, TLDR-ish docstring explaining their purpose. Do not explicitly state the word "TLDR" unless requested.
* **Code Formatting:** Always run the code formatter (e.g., Black/Prettier) after writing code.
* **Tests Location:** Tests are located at `tests/e2e` (or equivalent test directory); do not execute them unless explicitly asked.