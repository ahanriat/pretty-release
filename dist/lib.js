"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedGroups = [
    {
        label: '### Features 💎:',
        matcher: message => /.*(feature|feat|💎|experiment).*/i.test(message),
    },
    {
        label: '### Enhancements ⚡️:',
        matcher: message => /.*(enhance|enhancement|improvement|polish|clean|lint|⚡️|💄).*/i.test(message),
    },
    {
        label: '### Analytics 📊:',
        matcher: message => /.*(analytics|snowplow|amplitude).*/i.test(message),
    },
    {
        label: '### Library upgrade ⬆️:',
        matcher: message => /.*(upgrade|⬆️).*/i.test(message),
    },
    {
        label: '### Technical 👨‍🔧:',
        matcher: message => /.*(tech|chore|e2e).*/i.test(message),
    },
    {
        label: '### Tooling 🛠:',
        matcher: message => /.*(tooling).*/i.test(message),
    },
    {
        label: '### Bug fixes 🐛:',
        matcher: message => /.*(bug|fix|fixed|fixes|hotfix|🐛).*/i.test(message),
    },
    {
        label: '### Doc 📖:',
        matcher: message => /.*(doc|wiki|documentation|readme|📖).*/i.test(message),
    },
    {
        label: '### To be sorted 👈:',
        matcher: () => true,
    },
];
function prettifyRelease(release) {
    const { messages } = parseRelease(release);
    const categorizedMessages = messages.reduce((results, message) => {
        const categoryIndex = exports.orderedGroups.findIndex(group => group.matcher(message));
        if (categoryIndex >= 0) {
            results[categoryIndex].messages.push(message);
        }
        return results;
    }, exports.orderedGroups.map(group => ({ label: group.label, messages: [] })));
    const prettyMessages = categorizedMessages.map(group => `\n${group.label}\n${group.messages
        .map(prettifyMessage)
        .sort()
        .join('\n')}`);
    return `${prettyMessages.join('\n\n')}`;
}
exports.prettifyRelease = prettifyRelease;
function parseRelease(release) {
    const parsed = release
        .split('\n')
        .map(trimLine)
        .filter(isNotEmpty);
    if (parsed.length === 0) {
        return {
            messages: [],
        };
    }
    return {
        messages: parsed.filter(isMessage),
    };
}
exports.parseRelease = parseRelease;
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
