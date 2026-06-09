# Nextagentclaw

Nextagentclaw is an AI‑powered agent orchestrator and terminal‑based assistant built with Bun, TypeScript, and modern AI model integrations. It has three interaction modes:

* **Agent** – A full round‑robin machine‑learning agent that can plan, think and use external tools to accomplish user goals.
* **CLI** – A lightweight command‑line utility that sends a single prompt to the model and prints the reply.
* **TUI** – A colourful terminal UI that shows a splash screen, prompts the user and then hands control over to the agent.

All code is written in TypeScript and runs on [Bun](https://bun.sh/), giving it extremely fast startup and instant TypeScript support.

## Features

* Dedicated orchestration loop (`modes/agent/orchestrator.ts`) that handles the *think*, *plan*, *act* cycle.
* Tool execution sandbox (`modes/agent/tool‑executer.ts`) that safely runs external commands.
* Action tracking (`modes/agent/action‑tracker.ts`) – keeps a log of every tool call and its result.
* Multiple entry points (`index.ts`, `modes/cli.ts`, `tui/wakeup.ts`).
* Configurable AI models (`ai/ai.config.ts`).
* Very small bundle – no external runtime other than Bun.

## Project layout

```text
Nextagentclaw/
├─ ai/
|  ├─ ai.config.ts
|  └─ index.ts
├─ modes/
|  ├─ agent/
|  |  ├─ action‑tracker.ts
|  |  ├─ orchestrator.ts
|  |  ├─ tool‑executer.ts
|  |  └─ types.ts
|  └─ cli.ts
├─ tui/
|  └─ wakeup.ts
├─ index.ts
├─ package.json
├─ tsconfig.json
└─ bun.lock
``` 

## Getting started

1. **Clone** the repo.
   ```bash
   git clone https://github.com/your‑name/Nextagentclaw.git
   cd Nextagentclaw
   ```
2. **Install** dependencies with **Bun**.
   ```bash
   bun install
   ```
3. **Configure** your API keys in `ai/ai.config.ts` or as environment variables (`OPENAI_API_KEY`, `TOGETHER_API_KEY`, etc.).
4. **Run** the desired mode.
   ```bash
   # Agent mode – default entry point
   bun run start
   
   # CLI mode
   bun run cli
   
   # TUI mode
   bun run tui
   ```

## Scripts (in package.json)

```json
{
  "scripts": {
    "start": "tsx index.ts",
    "cli": "tsx modes/cli.ts",
    "tui": "tsx tui/wakeup.ts",
    "watch": "bun watch ."
  }
}
```

## Architecture

```
User
  │
  ▼
├─ TUI or CLI
  │
  ▼
 ├─ Orchestrator – decides what to do next
 │   │
 │   ├─ Tool‑executer – runs a tool and returns an observation
 │   └─ Action‑tracker – logs every step
 └─ AI model – receives prompts, returns actions
```

## License

MIT – see [LICENSE](LICENSE).