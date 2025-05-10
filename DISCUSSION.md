Thank you for you time in considering my application and my code. I’ve included a list of things that I though about but didn’t have time to take care of within the time alloted.

Responding to each of the points in order:

1. Anti-Patterns / Bugs

- Phone number should be a string. The value is numerical but we never perform numeric operations on it.

2. UI/UX Improvements

- Format Phone Numbers, Include `tel:` hyperlinks.
- Specialties could feature hyperlinks/buttons that take the user to a search for that specific specialty. Similar changes could be made for the degree
- Include some UI that lets a user know when they’re waiting on a network request

3. Frontend/Backend Performance Improvements

- The biggest backend/data change to make first would be to move the filtering to the backend. After that is done, pagination and sorting could be added to the backend as well without conflicting with the frontend's filtering.
- Move the table and/or rows to be server rendered components, the whole page component is currently a client component because we're managing the state of the table and the input all in one place. This change would work especially well with the pagination change if there's a handful of search result pages that many users see.
- Add a small debounce to the input to minimize the chance we search before a user is done typing.
- If you keep the filtering on the frontend, I’ve liked moving state that trickles down from other state into `useMemo` hooks.

4. Anything else

- I added an nvmrc in that matched the version in `@types/node` under `devDependencies`, which isn’t the Node LTS version. But I’m sure this isn’t a production application so
- Add a linting configuration. My linter may have stepped in and muddied up the waters of what meaningful changes I actually made, but all checked in code should be linted/styled to the same standards.
