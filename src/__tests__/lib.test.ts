import { ugglyReleaseNote, ugglyReleaseNote2 } from './blob/release-note-1';
import { parseRelease, prettifyRelease } from '~/lib';

describe('pretty release', () => {
  describe('parseRelease', () => {
    test('Parse the messages', () => {
      expect(parseRelease(ugglyReleaseNote).messages.length).toBe(32);
      expect(parseRelease(ugglyReleaseNote).messages[0]).toEqual(
        '- 🐛Fix missing translation on WorkoutPlanReadyScreen (#1891) (Antoine Hanriat)',
      );
    });
    test('Parse the messages 2/', () => {
      expect(parseRelease(ugglyReleaseNote2).messages).toEqual([
        '- Fix/Double workouts logged (#2976) (Nikita Nikitin)',
        '- Fix Env used in building iOS app (#3018) (Mohamed Shaban)',
      ]);
    });
  });

  describe('prettifyRelease', () => {
    test('Prettify the release note', () => {
      expect(prettifyRelease(ugglyReleaseNote)).toMatchSnapshot('prettyRelease');
    });
    test('Prettify the release note 2/', () => {
      expect(prettifyRelease(ugglyReleaseNote2)).toMatchSnapshot('prettyRelease2');
    });
    test('Prettify the release note is re entrant', () => {
      expect(prettifyRelease(prettifyRelease(ugglyReleaseNote))).toMatchSnapshot('prettyRelease');
    });
  });
});
