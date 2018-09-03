/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run.
 *
 */

$(function() {
    // This suite is about the RSS feeds definitions and the allFeeds variable.
    // Tests to make sure that the allFeeds variable has been defined
    // and that it is not empty.
    describe('RSS Feeds', function() {
        it('are defined', function() {
            // Check if allFeeds are defined.
            expect(allFeeds).toBeDefined();
            // Check if allFeeds are not empty.
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        it('have URLs', function() {
            for(let feed of allFeeds) {
                // Check if the URL is defined.
                expect(feed.url).toBeDefined();
                // Check if the URL is not empty.
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        it('have names', function() {
            for(let feed of allFeeds) {
                // Check if the name is defined.
                expect(feed.name).toBeDefined();
                // Check if the name is not empty.
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    // Test suite named "The menu".
    describe('The menu', function() {
        // Define body and menu variables.
        let body = document.querySelector('body');
        let menu = document.querySelector('.menu-icon-link');

        // Test that ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            // Check if the menu element is hidden by default.
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         // Test that ensures the menu changes visibility when the menu icon is clicked.
        it('changes visibility on click', function() {
            // Check if the menu-hidden is false when the manu icon is clicked. (1st click)
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // Check if the menu-hidden is true when the manu icon is clicked. (2nd click)
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Test suite named "Initial Entries".
    describe('Initial Entries', function() {

        // Test that ensures when the loadFeed function is called and completes its work.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least one element', function() {
            // Define enteris variable.
            let entry = $('.feed .entry');
            // Check if there is at least a single element.
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    // Test suite named "New Feed Selection".
    describe('New Feed Selection', function() {
        // Define previous and new URL variables.
        let prevUrl,
            newUrl;

        beforeEach(function(done) {
          // Load first feed.
          loadFeed(0, function() {
            // Store content in prevUrl
            prevUrl = $('.feed').html();
            // Load second feed as a callback of the first
            loadFeed(1, function() {
              newUrl = $('.feed').html();
            });
            // Call done() as callback of the second feed.
            done();
          });
        });

        it('new feed is loaded and content actually changes', function(done) {
            // Check if the new URL is not equal to previous URL.
            expect(newUrl).not.toEqual(prevUrl);
            done();
        });
    });
});
