export declare function prettifyRelease(release: string): string;
interface ParsedReleaseNote {
    messages: string[];
}
export declare function parseRelease(release: string): ParsedReleaseNote;
export {};
