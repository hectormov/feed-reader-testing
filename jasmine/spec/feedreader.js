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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
        Loops over the feeds, reviews that URL is defined and not empty
         */
        it('each has an URL defined and not empty', function(){
            allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
          })
        });

        /*
        Loops over the feeds, reviews that NAME is defined and not empty
         */
        it('each has a name defined and not empty', function(){
            allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');
          })
        });
    });

    describe('The menu', function() {
        /*
        Finds the Body element, checks if within the classes assigned to body 'menu-hidden' is one of them
         */
        const body = document.querySelector('body');
            it('is hidden by default', function() {
                expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /*
        Finds the menu icon element, clicks it and checks that the menu is visible
        Click again and verify that is no longer visible
        */
        it('shows or hides the menu when clicked', function(){
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /*
        Calls the load feeds function which is asynchronous
        */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /*
        Finds all the retrieved articles and saves them into feedContainer
        Then we check to make sure that there is at least 1 in it.
         */
        it('looks for at least 1 entry within the feed container', function(done){
            const feedContainer = document.querySelectorAll('.feed .entry');
            expect(feedContainer.length).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function() {
        /*
        Find the feed container which is where all the articles are loaded into
        Declares variables to save the feeds to be used for comparison later
        */
        const feedContainer = document.querySelector('.feed');
        let firstFeed;
        let secondFeed;
        /*
        Calls load Feed function which is asynchronous, after retrieving the first feed
        all the HTML content is saved in the first Feed variable. Then we call the function again
        to load a different feed. The HTML content for it is saved on the secondFeed variable
        */
        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = feedContainer.innerHTML;
                loadFeed(1, function(){
                    secondArticle = feedContainer.firstElementChild.innerText;
                    done();
                });
            });
        });

        // First feed and second feed are compared to make sure they are different
        it('changes content when a new feed is loaded', function(done){
            expect(secondFeed).not.toMatch(firstFeed);
            done();
        });
    });
}());
