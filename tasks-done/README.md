# Task Documentation Guidelines for Agents & Contributors

> **Notice:** This repository is a group project. To ensure seamless teamwork, clarity, and continuity across all agents and team members, strict documentation protocols must be followed.

---

## 1. Documentation Requirements

Every agent or developer working on this project **must thoroughly document everything completed**. For every task, you must answer:

- **What:** Exactly what changes, features, bug fixes, or components were built.
- **Why:** The reason and motivation behind the work (the business/architectural requirement it addresses).
- **How:** The technical implementation details (how it was built, design decisions, APIs, schemas, and configurations).
- **Key Factors & Dependencies:** Important context, environment variables/keys, prerequisites, breaking changes, or critical notes that teammates must know.

---

## 2. Folder Structure & Individual Folders

To keep work organized and prevent conflicts:

1. **Create Your Own Folder:**
   Each agent/contributor must create their own dedicated folder inside `tasks-done/`:
   ```text
   tasks-done/
   ├── README.md (this file)
   ├── [agent-or-member-name]/
   │   ├── task-01-feature-name.md
   │   ├── task-02-api-endpoint.md
   │   └── ...
   ```

2. **Create Individual Task Files:**
   Do not dump all tasks into a single messy file. Create a dedicated `.md` file for each completed unit of work with a descriptive name (e.g., `user-auth-setup.md`, `database-models.md`).

---

## 3. Standard Task File Template

Use this format for your documentation files:

```markdown
# [Task Name / Feature Title]

- **Contributor / Agent:** [Name or Agent ID]
- **Date Completed:** [YYYY-MM-DD]
- **Branch / Module:** [e.g., frontend / backend / dev]

---

### 1. Overview (What was done)
Brief summary of the work completed and files created or modified.

### 2. Motivation & Objective (Why it was done)
Explain why this task was necessary, the problem it solves, or user story it implements.

### 3. Implementation Details (How it was done)
- Architecture, design patterns, or libraries utilized.
- Step-by-step breakdown of how the solution works.
- Code structures, endpoints, or UI components created.

### 4. Critical Factors & Keys (Important for Team Members)
- **Environment Variables / Configs:** (List any keys, settings, or `.env` entries required).
- **Prerequisites / Dependencies:** (Packages installed, migrations needed, etc.).
- **Gotchas / Known Limitations:** (Any caveats, edge cases, or follow-up items).

### 5. Verification & Testing
How to test or verify that this task works as expected.
```

---

## 4. Why This Matters

- **Zero Friction Collaboration:** Teammates and other agents can quickly grasp your work without guessing or reverse-engineering code.
- **Clean Audit Trail:** Easy tracking of architectural decisions and progress.
- **Smooth Integration:** Minimizes integration bugs and misconfigurations.
