import { ugglyReleaseNote, prettyReleaseNote } from './blob/release-note-1';
import { parseRelease, prettifyRelease, categorizeMessage } from '~/lib';
describe('pretty release', () => {
    describe('parseRelease', () => {
        test('Parse the title', () => {
            expect(parseRelease(ugglyReleaseNote).title).toBe('## v4.2.0:');
        });
        test('Parse the messages', () => {
            expect(parseRelease(ugglyReleaseNote).messages.length).toBe(32);
            expect(parseRelease(ugglyReleaseNote).messages[0]).toEqual('- 🐛Fix missing translation on WorkoutPlanReadyScreen (#1891) (Antoine Hanriat)');
        });
    });
    describe('categorizeMessage', () => {
        test('Features 🧬', () => {
            expect(categorizeMessage('- 🚛 Feat: Exercise store (#1898)')).toBe('feature');
            expect(categorizeMessage('- feature Exercise store (#1898)')).toBe('feature');
            expect(categorizeMessage('- feature: Exercise store (#1898)')).toBe('feature');
            expect(categorizeMessage('- 🧬add new paywall (#1898)')).toBe('feature');
            expect(categorizeMessage('Experiment: Hard conclude something')).toBe('feature');
        });
        test('Enhancements ⚡️', () => {
            expect(categorizeMessage('- DS-56 💄 Improvement/segmented slider')).toBe('enhancement');
            expect(categorizeMessage('- DS-56 💄 slider')).toBe('enhancement');
            expect(categorizeMessage('- enhance slider')).toBe('enhancement');
            expect(categorizeMessage('- enhancement')).toBe('enhancement');
            expect(categorizeMessage('- ⚡️ improve some thing')).toBe('enhancement');
        });
        test('Analytics 📊', () => {
            expect(categorizeMessage('analytics: Hard conclude 1803-currency-symbols')).toBe('analytics');
            expect(categorizeMessage('Add Snowplow events (#1882)')).toBe('analytics');
            expect(categorizeMessage('delete Amplitude events (#1882)')).toBe('analytics');
        });
        test('Bug fixes 🐛', () => {
            expect(categorizeMessage('🐛Fix missing translation on (#1891)')).toBe('fix');
            expect(categorizeMessage('🐛translation on WorkoutPlanReadyScreen (#1891)')).toBe('fix');
            expect(categorizeMessage('Fixed missing translation on  (#1891)')).toBe('fix');
            expect(categorizeMessage('BUG missing translation on  (#1891)')).toBe('fix');
        });
        test('Library upgrade ⬆️', () => {
            expect(categorizeMessage('- ⬆Upgrade appboy-sdk (Braze) (#1950)')).toBe('upgrade');
            expect(categorizeMessage('- ⬆️Upgrade React-native to 57.5 (#1819)')).toBe('upgrade');
            expect(categorizeMessage('- 🌈Upgrade and fix Storybook (#1916)')).toBe('upgrade');
        });
        test('Doc 📖', () => {
            expect(categorizeMessage('- Wiki update for Detox (#1920)')).toBe('doc');
            expect(categorizeMessage('- doc update for Detox (#1920)')).toBe('doc');
            expect(categorizeMessage('- readme update for Detox (#1920)')).toBe('doc');
            expect(categorizeMessage('- documentation update for Detox (#1920)')).toBe('doc');
            expect(categorizeMessage('- 📖 update for Detox (#1920)')).toBe('doc');
            expect(categorizeMessage('- Few words on the branches in wiki')).toBe('doc');
        });
        test('To be sorted 👈', () => {
            expect(categorizeMessage('- DownloadError component for migration  (#1893)')).toBe('unknown');
            expect(categorizeMessage('- Save body fat value onScroll (#1899)')).toBe('unknown');
            expect(categorizeMessage('- Automated releases for GitHub (#1901)')).toBe('unknown');
            expect(categorizeMessage('- Use legacy build system for testing builds')).toBe('unknown');
            expect(categorizeMessage('- Remove deprecated PlansScreen (#1918)')).toBe('unknown');
            expect(categorizeMessage('- MT-585 Update new Snapshot screen to display ')).toBe('unknown');
            expect(categorizeMessage('- Chore/loading states (#1919)')).toBe('unknown');
            expect(categorizeMessage('- [WKT-499][TI-74] WorkoutTemplate')).toBe('unknown');
            expect(categorizeMessage('- Update post-workout kcal estimation')).toBe('unknown');
        });
    });
    describe('prettifyRelease', () => {
        test('Prettify the release note', () => {
            expect(prettifyRelease(ugglyReleaseNote)).toEqual(prettyReleaseNote);
        });
        test('Prettify the release note is re entrant', () => {
            expect(prettifyRelease(prettifyRelease(ugglyReleaseNote))).toEqual(prettyReleaseNote);
        });
    });
});
