import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

import { runCliMode } from "../modes/cli";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#6e5bfa72");
const FACE = chalk.hex("#e8dfcd").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(("  " + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
}

export async function runWakeup() {
  let ascci: string;
  try {
    ascci = figlet.textSync("nextagentclaw", { font: BANNER_FONT });
  } catch (error) {
    ascci = figlet.textSync("nextagentclaw", { font: "Standard" });
  }
  printBannerWithShadow(ascci);

  const mode = await select({
    message: "Which mode you went to precced",
    options: [
      { value: "cli", label: "CLI" },
      { value: "telegram", label: "Telegram" },
      { value: "exit", label: "EXIT" },
    ],
  });

  if (isCancel(mode || mode === "exit")) {
    console.log(chalk.dim("\n Goodbye .. \n"));
    return;
  }

  if (mode === "cli") {
    console.log(chalk.dim("Starting cli mode ....."));
    await runCliMode();
  } else if (mode === "telegram") {
    console.log(chalk.dim("starting Telegram mode ....."));
  }
}
