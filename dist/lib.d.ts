declare type Category = 'feature' | 'enhancement' | 'analytics' | 'fix' | 'upgrade' | 'doc' | 'unknown';
export declare function prettifyRelease(release: string): string;
interface ParsedReleaseNote {
    title: string;
    messages: string[];
}
export declare function parseRelease(release: string): ParsedReleaseNote;
export declare function categorizeMessage(message: string): Category;
export {};
