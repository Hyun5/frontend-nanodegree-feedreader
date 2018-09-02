/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // Check if allFeeds are defined
            expect(allFeeds).toBeDefined();
            // Check if allFeeds are not empty
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            for(let feed of allFeeds) {
                // Check if the URL is defined
                expect(feed.url).toBeDefined();
                // Check if the URL is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            for(let feed of allFeeds) {
                // Check if the name is defined
                expect(feed.name).toBeDefined();
                // Check if the name is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // Define body variable
        let body = document.querySelector('body');
        // Define menu variable
        let menu = document.querySelector('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // Check if the menu element is hidden by default
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays when clicked', function() {
            // Check if the menu icon is clicked (1st click)
            menu.click();
            // Check if the menu-hidden is false when the manu icon is clicked (1st click)
            expect(body.classList.contains('menu-hidden')).toBe(false);
        });

        it('hides when clicked again', function() {
            // Check if the menu icon is clicked (2nd click)
            menu.click();
            // Check if the menu-hidden is true when the manu icon is clicked (2nd click)
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least one element', function() {
            // Define enteris variable
            const entries = document.querySelector('.entry');
            // Check if there is at least a single element
            expect(entries).not.toBeNull();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        // Define previous and new URL variables
        var preUrl;
        var newUrl;

        beforeEach(function(done) {
            // Assign previous URL to preURL variable
            preUrl = $('.entry-link').attr('href');
            // Call next feed
            loadFeed(1, done);
        });

        it('new feed is loaded and content actually changes', function(done) {
            // Assign new URL to newURL variable
            newUrl = $('.entry-link').attr('href');
            // Check if the new URL is not equal to previous URL
            expect(newUrl).not.toEqual(preUrl);
            done();
        });
    });   
});
