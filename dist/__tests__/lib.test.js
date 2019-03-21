"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const release_note_1_1 = require("./blob/release-note-1");
const lib_1 = require("~/lib");
describe('pretty release', () => {
    describe('parseRelease', () => {
        test('Parse the messages', () => {
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote).messages.length).toBe(32);
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote).messages[0]).toEqual('- 🐛Fix missing translation on WorkoutPlanReadyScreen (#1891) (Antoine Hanriat)');
        });
        test('Parse the messages 2/', () => {
            expect(lib_1.parseRelease(release_note_1_1.ugglyReleaseNote2).messages).toEqual([
                '- Fix/Double workouts logged (#2976) (Nikita Nikitin)',
                '- Fix Env used in building iOS app (#3018) (Mohamed Shaban)',
            ]);
        });
    });
    describe('prettifyRelease', () => {
        test('Prettify the release note', () => {
            expect(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote)).toMatchSnapshot('prettyRelease');
        });
        test('Prettify the release note 2/', () => {
            expect(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote2)).toMatchSnapshot('prettyRelease2');
        });
        test('Prettify the release note is re entrant', () => {
            expect(lib_1.prettifyRelease(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote))).toMatchSnapshot('prettyRelease');
        });
    });
});
