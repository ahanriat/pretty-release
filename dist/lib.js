"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const categoryOrder = [
    { type: 'feature', label: '### Features 🧬:' },
    { type: 'enhancement', label: '### Enhancements ⚡️:' },
    { type: 'analytics', label: '### Analytics 📊:' },
    { type: 'fix', label: '### Bug fixes 🐛:' },
    { type: 'upgrade', label: '### Library upgrade ⬆️:' },
    { type: 'doc', label: '### Doc 📖:' },
    { type: 'unknown', label: '### To be sorted 👈' },
];
function prettifyReleaseFromFile(releaseNotePath, outputFilePath) {
    const rawReleaseNote = fs_1.default.readFileSync(releaseNotePath).toString();
    fs_1.default.writeFileSync(outputFilePath, prettifyRelease(rawReleaseNote));
}
exports.prettifyReleaseFromFile = prettifyReleaseFromFile;
function prettifyRelease(release) {
    const { title, messages } = parseRelease(release);
    const groupedMessages = lodash_1.groupBy(messages, categorizeMessage);
    const categories = categoryOrder
        .map(categ => {
        const messagesForCategory = groupedMessages[categ.type];
        if (!messagesForCategory) {
            return '';
        }
        return `
${categ.label}
${messagesForCategory
            .map(prettifyMessage)
            .sort()
            .join('\n')}`;
    })
        .filter(section => !!section)
        .join('\n\n')
        .trim();
    return `${title}

${categories}
  `;
}
exports.prettifyRelease = prettifyRelease;
function parseRelease(release) {
    const parsed = release
        .split('\n')
        .map(trimLine)
        .filter(isNotEmpty);
    return {
        title: parsed[0],
        messages: parsed.filter(isMessage),
    };
}
exports.parseRelease = parseRelease;
function categorizeMessage(message) {
    const match = MATCHERS.find(matcher => matcher.regex.test(message));
    return !!match ? match.category : 'unknown';
}
exports.categorizeMessage = categorizeMessage;
const MATCHERS = [
    {
        category: 'feature',
        regex: /.*(feature|feat|🧬|experiment).*/i,
    },
    {
        category: 'enhancement',
        regex: /.*(enhance|enhancement|⚡️|💄).*/i,
    },
    {
        category: 'analytics',
        regex: /.*(analytics|snowplow|amplitude).*/i,
    },
    {
        category: 'upgrade',
        regex: /.*(upgrade|⬆️).*/i,
    },
    {
        category: 'fix',
        regex: /.*(bug|fix|fixed|fixes|hotfix|🐛).*/i,
    },
    {
        category: 'doc',
        regex: /.*(doc|wiki|documentation|readme|📖).*/i,
    },
];
function isNotEmpty(line) {
    return !!line;
}
function trimLine(line = '') {
    return line.trim();
}
function isMessage(line = '') {
    return line.trim().startsWith('- ');
}
/**
 * Add the `  - ` in front of every message to create the markdown list
 */
function prettifyMessage(message) {
    return `  - ${message.replace('-', '').trim()}`;
}