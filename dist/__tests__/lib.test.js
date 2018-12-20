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
    describe('prettifyRelease', () => {
        test('Prettify the release note', () => {
            expect(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote)).toMatchSnapshot('prettyRelease');
        });
        test('Prettify the release note is re entrant', () => {
            expect(lib_1.prettifyRelease(lib_1.prettifyRelease(release_note_1_1.ugglyReleaseNote))).toMatchSnapshot('prettyRelease');
        });
    });
});
