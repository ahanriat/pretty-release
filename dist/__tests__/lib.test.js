"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const release_note_1_1 = require("./blob/release-note-1");
const lib_1 = require("~/lib");
describe('pretty release', () => {
    describe('parseRelease', () => {
        test('Parse the title', () => {
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote).title).toBe('## v4.2.0:');
        });
        test('Parse the messages', () => {
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote).messages.length).toBe(32);
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote).messages[0]).toEqual('- 🐛Fix missing translation on WorkoutPlanReadyScreen (#1891) (Antoine Hanriat)');
        });
    });
    describe('categorizeMessage', () => {
        test('Features 🧬', () => {
            expect(lib_1.categorizeMessage('- 🚛 Feat: Exercise store (#1898)')).toBe('feature');
            expect(lib_1.categorizeMessage('- feature Exercise store (#1898)')).toBe('feature');
            expect(lib_1.categorizeMessage('- feature: Exercise store (#1898)')).toBe('feature');
            expect(lib_1.categorizeMessage('- 🧬add new paywall (#1898)')).toBe('feature');
            expect(lib_1.categorizeMessage('Experiment: Hard conclude something')).toBe('feature');
        });
        test('Enhancements ⚡️', () => {
            expect(lib_1.categorizeMessage('- DS-56 💄 Improvement/segmented slider')).toBe('enhancement');
            expect(lib_1.categorizeMessage('- DS-56 💄 slider')).toBe('enhancement');
            expect(lib_1.categorizeMessage('- enhance slider')).toBe('enhancement');
            expect(lib_1.categorizeMessage('- enhancement')).toBe('enhancement');
            expect(lib_1.categorizeMessage('- ⚡️ improve some thing')).toBe('enhancement');
        });
        test('Analytics 📊', () => {
            expect(lib_1.categorizeMessage('analytics: Hard conclude 1803-currency-symbols')).toBe('analytics');
            expect(lib_1.categorizeMessage('Add Snowplow events (#1882)')).toBe('analytics');
            expect(lib_1.categorizeMessage('delete Amplitude events (#1882)')).toBe('analytics');
        });
        test('Bug fixes 🐛', () => {
            expect(lib_1.categorizeMessage('🐛Fix missing translation on (#1891)')).toBe('fix');
            expect(lib_1.categorizeMessage('🐛translation on WorkoutPlanReadyScreen (#1891)')).toBe('fix');
            expect(lib_1.categorizeMessage('Fixed missing translation on  (#1891)')).toBe('fix');
            expect(lib_1.categorizeMessage('BUG missing translation on  (#1891)')).toBe('fix');
        });
        test('Library upgrade ⬆️', () => {
            expect(lib_1.categorizeMessage('- ⬆Upgrade appboy-sdk (Braze) (#1950)')).toBe('upgrade');
            expect(lib_1.categorizeMessage('- ⬆️Upgrade React-native to 57.5 (#1819)')).toBe('upgrade');
            expect(lib_1.categorizeMessage('- 🌈Upgrade and fix Storybook (#1916)')).toBe('upgrade');
        });
        test('Doc 📖', () => {
            expect(lib_1.categorizeMessage('- Wiki update for Detox (#1920)')).toBe('doc');
            expect(lib_1.categorizeMessage('- doc update for Detox (#1920)')).toBe('doc');
            expect(lib_1.categorizeMessage('- readme update for Detox (#1920)')).toBe('doc');
            expect(lib_1.categorizeMessage('- documentation update for Detox (#1920)')).toBe('doc');
            expect(lib_1.categorizeMessage('- 📖 update for Detox (#1920)')).toBe('doc');
            expect(lib_1.categorizeMessage('- Few words on the branches in wiki')).toBe('doc');
        });
        test('To be sorted 👈', () => {
            expect(lib_1.categorizeMessage('- DownloadError component for migration  (#1893)')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Save body fat value onScroll (#1899)')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Automated releases for GitHub (#1901)')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Use legacy build system for testing builds')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Remove deprecated PlansScreen (#1918)')).toBe('unknown');
            expect(lib_1.categorizeMessage('- MT-585 Update new Snapshot screen to display ')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Chore/loading states (#1919)')).toBe('unknown');
            expect(lib_1.categorizeMessage('- [WKT-499][TI-74] WorkoutTemplate')).toBe('unknown');
            expect(lib_1.categorizeMessage('- Update post-workout kcal estimation')).toBe('unknown');
        });
    });
    describe('prettifyRelease', () => {
        test('Prettify the release note', () => {
            expect(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote)).toEqual(release_note_1_1.prettyReleaseNote);
        });
        test('Prettify the release note is re entrant', () => {
            expect(lib_1.prettifyRelease(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote))).toEqual(release_note_1_1.prettyReleaseNote);
        });
    });
});
