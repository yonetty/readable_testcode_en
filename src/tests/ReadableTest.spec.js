const {Sprint, Story} = require('../entities');

const defaults = (val, defaultVal) => val === undefined ? defaultVal : val;

const aSprint = ({id, description} = {}) =>
    new Sprint(
        defaults(id, 1),
        defaults(description, 'any')
    );

const aStory = ({title, description, point, asignee} = {}) =>
    new Story(
        defaults(title, 'any'),
        defaults(description, 'any'),
        defaults(point, 0),
        defaults(asignee, 'any')
    );

describe('Sprint:', () => {
    let sut;

    beforeEach(() => {
        sut = aSprint();
    });

    it('Should be correctly instantiated.', () => {
        // Assert
        expect(sut.id).toBe(1);
        expect(sut.stories).toHaveLength(0);
    });

    it('Should be added a story.', () => {
        // Arrange
        const story = new Story('Setup env', 'Set up development environment.');
        // Act
        sut.addStory(story);
        // Assert
        expect(sut.stories).toHaveLength(1);
    });

    it('should report an assignment summary grouped by person and sorted with points by descending order.', () => {
        // Arrange
        const [pt1, pt2, pt3, pt4] = [3, 2, 1, 2];
        const story1 = aStory({point: pt1, asignee: 'Robert'});
        const story2 = aStory({point: pt2, asignee: 'Alice'});
        const story3 = aStory({point: pt3, asignee: 'Eric'});
        const story4 = aStory({point: pt4, asignee: 'Alice'});
        [story1, story2, story3, story4].forEach(s => sut.addStory(s));
        // Act
        const assignment = sut.assignment;
        // Assert
        expect(assignment).toEqual([
            ['Alice', (pt2 + pt4)], //4 points
            ['Robert', pt1], // 3 points
            ['Eric', pt3], // 1 points
        ]);
    });
});

describe('Story', () => {
    test.each`
        point | asignee     | expected | desc
         ${3} | ${null}     | ${false} | ${'Point: set, asignee: NOT set'}
         ${0} | ${'anyone'} | ${false} | ${'Point: NOT set, asignee: set'}
         ${0} | ${null}     | ${false} | ${'Point: NOT set, asignee: NOT set'}
         ${3} | ${'anyone'} | ${true}  | ${'Point: set, asginee: set'}
    `("Should be started or not when: $desc", ({point, asignee, expected}) => {
        // Arrange
        const sut = aStory({point, asignee});
        // Act
        const canBeStarted = sut.canBeStarted;
        // Assert
        expect(canBeStarted).toBe(expected);
    });
});

