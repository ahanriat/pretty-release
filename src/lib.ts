interface Group {
  label: string;
  matcher(message: string): boolean;
}

const orderedGroups: Group[] = [
  {
    label: '### Features 🧬:',
    matcher: message => /.*(feature|feat|🧬|experiment).*/i.test(message),
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
    label: '### Technical 🛠:',
    matcher: message => /.*(tooling|tech|chore|🛠).*/i.test(message),
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

export function prettifyRelease(release: string): string {
  const { title, messages } = parseRelease(release);

  const categorizedMessages = messages.reduce((results, message) => {
    const categoryIndex = orderedGroups.findIndex(group => group.matcher(message));
    if (categoryIndex >= 0) {
      results[categoryIndex].messages.push(message);
    }
    return results;
  }, orderedGroups.map(group => ({ label: group.label, messages: [] as string[] })));

  const prettyMessages = categorizedMessages.map(
    group => `\n${group.label}\n${group.messages.map(prettifyMessage).sort().join('\n')}`,
  );

  return `${title}\n${prettyMessages.join('\n\n')}`;
}

interface ParsedReleaseNote {
  title: string;
  messages: string[];
}
export function parseRelease(release: string): ParsedReleaseNote {
  const parsed = release
    .split('\n')
    .map(trimLine)
    .filter(isNotEmpty);

  return {
    title: parsed[0],
    messages: parsed.filter(isMessage),
  };
}

function isNotEmpty(line?: string): boolean {
  return !!line;
}

function trimLine(line: string = ''): string {
  return line.trim();
}

function isMessage(line: string = ''): boolean {
  return line.trim().startsWith('- ');
}

/**
 * Add the `  - ` in front of every message to create the markdown list
 */
function prettifyMessage(message: string) {
  return `  - ${message.replace('-', '').trim()}`;
}
