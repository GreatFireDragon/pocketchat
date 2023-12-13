import chalk from "chalk";

export function loadingSpeedBefore() {
  const start = performance.now();
  return start;
}

export function loadingSpeedAfter(start, route, threshold = 2000) {
  const end = performance.now();

  let responseTime = end - start;

  if (responseTime > threshold) {
    console.log(chalk.green.bgRed.bold.black(`🐢 ${route} took ${responseTime.toFixed(2)} ms`));
  }

  if (responseTime <= threshold) {
    console.log(chalk.green.bgGreen.bold.black(`🚀 ${route} took ${responseTime.toFixed(2)} ms`));
  }
}
