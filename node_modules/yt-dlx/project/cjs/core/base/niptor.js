"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const child_process_1 = require("child_process");
/**
 * Checks if sudo is available.
 *
 * @returns A Promise that resolves with a boolean indicating whether sudo is available.
 */
async function checkSudo() {
    return new Promise((resolve) => {
        const check = (0, child_process_1.spawn)("sudo", ["-n", "true"]);
        check.on("close", (code) => {
            resolve(code === 0);
        });
    });
}
/**
 * Executes a command with or without sudo based on availability.
 *
 * @param args - The arguments to pass to the command.
 * @returns A Promise that resolves with an object containing stdout and stderr data.
 * @throws An error if the command execution fails.
 */
async function niptor(args) {
    const sudoAvailable = await checkSudo();
    const command = sudoAvailable ? ["sudo", ...args] : args;
    const prox = (0, child_process_1.spawn)("sh", ["-c", command.join(" ")]);
    const [stdoutData, stderrData] = await Promise.all([
        new Promise((resolve, reject) => {
            const stdoutData = [];
            prox.stdout.on("data", (data) => stdoutData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stdoutData).toString());
                else
                    reject(new Error(colors_1.default.red("@error: ") +
                        `not able to connect to the server. if using ${colors_1.default.yellow("onionTor")}, maybe try running ${colors_1.default.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors_1.default.yellow("sudo privileges")}!`));
            });
        }),
        new Promise((resolve, reject) => {
            const stderrData = [];
            prox.stderr.on("data", (data) => stderrData.push(data));
            prox.on("close", (code) => {
                if (code === 0)
                    resolve(Buffer.concat(stderrData).toString());
                else
                    reject(new Error(colors_1.default.red("@error: ") +
                        `not able to connect to the server. if using ${colors_1.default.yellow("onionTor")}, maybe try running ${colors_1.default.yellow("npx yt-dlx install:socks5")}. make sure yt-dlx is always running with ${colors_1.default.yellow("sudo privileges")}!`));
            });
        }),
    ]);
    return { stdout: stdoutData, stderr: stderrData };
}
exports.default = niptor;
//# sourceMappingURL=niptor.js.map