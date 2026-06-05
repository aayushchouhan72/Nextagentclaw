import chalk from "chalk";
import { isCancel, text } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";
import { ActionTracker } from "./action-tracker.ts";
import { ToolExecutor } from "./tool-executer.ts";

export async function runAgentMode() {
  console.log(chalk.bold("\n Agent mode \n"));

  const goal = await text({
    message: "What would you like the agent to do",
    placeholder: "Concrete task for  this codebase",
  });

  if (isCancel(goal) || !goal.trim()) return;

  const cofig = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executer = new ToolExecutor(tracker, cofig);
}
