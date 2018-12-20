import { ugglyReleaseNote } from './blob/release-note-1';
import { parseRelease, prettifyRelease } from '~/lib';

describe('pretty release', () => {
  describe('parseRelease', () => {
    test('Parse the title', () => {
      expect(parseRelease(ugglyReleaseNote).title).toBe('## v4.2.0:');
    });
    test('Parse the messages', () => {
      expect(parseRelease(ugglyReleaseNote).messages.length).toBe(32);
      expect(parseRelease(ugglyReleaseNote).messages[0]).toEqual(
        '- 🐛Fix missing translation on WorkoutPlanReadyScreen (#1891) (Antoine Hanriat)',
      );
    });
  });

  describe('prettifyRelease', () => {
    test('Prettify the release note', () => {
      expect(prettifyRelease(ugglyReleaseNote)).toMatchSnapshot('prettyRelease');
    });
    test('Prettify the release note is re entrant', () => {
      expect(prettifyRelease(prettifyRelease(ugglyReleaseNote))).toMatchSnapshot('prettyRelease');
    });
  });
});
