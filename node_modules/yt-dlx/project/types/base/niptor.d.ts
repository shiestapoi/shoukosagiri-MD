/**
 * Executes a command with or without sudo based on availability.
 *
 * @param args - The arguments to pass to the command.
 * @returns A Promise that resolves with an object containing stdout and stderr data.
 * @throws An error if the command execution fails.
 */
export default function niptor(args: string[]): Promise<{
    stdout: string;
    stderr: string;
}>;
//# sourceMappingURL=niptor.d.ts.map