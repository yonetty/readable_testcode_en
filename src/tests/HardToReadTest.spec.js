const {Sprint, Story} = require('../entities');

describe('Sprint:', () => {
    it('should be correctly instantiated.', () => {
        const sprint = new Sprint(1);
        expect(sprint.id).toBe(1);
        expect(sprint.stories).toHaveLength(0);

        const story = new Story('Setup env', 'Set up development environment.');
        sprint.addStory(story);
        expect(sprint.stories).toHaveLength(1);
    });

    it('should report an assingment summary.', () => {
        const sprint = new Sprint(1);

        const story1 = new Story('Setup env', 'Set up development environment.', 3, 'Robert');
        sprint.addStory(story1);
        const story2 = new Story('Sample app', 'Write a sample code.', 2, 'Alice');
        sprint.addStory(story2);
        const story3 = new Story('Unit test', 'Write unit tests.', 1, 'Eric');
        sprint.addStory(story3);
        const story4 = new Story('E2E', 'Write end-to-end tests.', 2, 'Alice');
        sprint.addStory(story4);
        // Grouped by person then sorted with points by descending order.
        expect(sprint.assignment).toEqual([
            ['Alice', 4],
            ['Robert', 3],
            ['Eric', 1],
        ]);
    });
});

describe('Story:', () => {
    it('cannot be started when assignee is not set.', () => {
        const story = new Story('Setup env', 'Set up development environment', 3, null);
        expect(story.canBeStarted).toBe(false);
    });
    it('cannot be started when point is not set.', () => {
        const story = new Story('Setup env', 'Set up development environment', 0, 'Alice');
        expect(story.canBeStarted).toBe(false);
    });
    it('cannot be started when assignee nor point is not set', () => {
        const story = new Story('Setup env', 'Set up development environment', 0, null);
        expect(story.canBeStarted).toBe(false);
    });
    it('can be started when both assignee and point are set.', () => {
        const story = new Story('Setup env', 'Set up development environment', 3, 'Alice');
        expect(story.canBeStarted).toBe(true);
    });
});
