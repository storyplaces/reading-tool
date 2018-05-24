import {HTMLSanitiser} from "../../../src/resources/utilities/HTMLSanitiser";

let configAllowingScriptTags: any = {
    read(): boolean {
        return true;
    }
};

let configBlockingScriptTags: any = {
    read(): boolean {
        return false;
    }
};

let htmlSanitizer: HTMLSanitiser;

describe("HTML Sanitiser", () => {

    describe("With script tags enabled in config", () => {
        beforeEach(() => {
            htmlSanitizer = new HTMLSanitiser(configAllowingScriptTags);
        });

        describe("sanitisePageContent", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("allows script tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<script>console.log('hello world!')</script>");
                expect(result).toEqual("<script>console.log('hello world!')</script>");
            });

            it("removes button tags", () => {
                let result = htmlSanitizer.sanitisePageContent('<button type="submit">Submit!</button>');
                expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<img src="image.png">');
                expect(result).toEqual("<img />");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<audio src="image.png"></audio>');
                expect(result).toEqual("<audio></audio>");
            });

            it("allows image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<img data-media-id="1">');
                expect(result).toEqual('<img data-media-id="1" />');
            });

            it("allows audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<audio data-media-id="1"></audio>');
                expect(result).toEqual('<audio data-media-id="1"></audio>');
            });
        });

        describe("sanitiseStoryDescription", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("removes script tags", () => {
               let result = htmlSanitizer.sanitiseStoryDescription("<script>console.log('hello world!')</script>");
               expect(result).toEqual("");
            });

            it("removes button tags", () => {
               let result = htmlSanitizer.sanitiseStoryDescription('<button type="submit">Submit!</button>');
               expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<img src="image.png">');
                expect(result).toEqual("");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<audio src="image.png"></audio>');
                expect(result).toEqual("");
            });

            it("allows image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<img data-media-id="1">');
                expect(result).toEqual("");
            });

            it("allows audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<audio data-media-id="1"></audio>');
                expect(result).toEqual("");
            });
        });

        describe("sanitiseCollectionDescription", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("removes script tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<script>console.log('hello world!')</script>");
                expect(result).toEqual("");
            });

            it("removes button tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription('<button type="submit">Submit!</button>');
                expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<img src="image.png">');
                expect(result).toEqual("");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<audio src="image.png"></audio>');
                expect(result).toEqual("");
            });

            it("removed image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<img data-media-id="1">');
                expect(result).toEqual("");
            });

            it("removes audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<audio data-media-id="1"></audio>');
                expect(result).toEqual("");
            });
        });
    });

    describe("With script tags disabled in config", () => {
        beforeEach(() => {
            htmlSanitizer = new HTMLSanitiser(configBlockingScriptTags);
        });

        describe("sanitisePageContent", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("removes script tags", () => {
                let result = htmlSanitizer.sanitisePageContent("<script>console.log('hello world!')</script>");
                expect(result).toEqual("");
            });

            it("removes button tags", () => {
                let result = htmlSanitizer.sanitisePageContent('<button type="submit">Submit!</button>');
                expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<img src="image.png">');
                expect(result).toEqual("<img />");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<audio src="image.png"></audio>');
                expect(result).toEqual("<audio></audio>");
            });

            it("allows image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<img data-media-id="1">');
                expect(result).toEqual('<img data-media-id="1" />');
            });

            it("allows audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitisePageContent('<audio data-media-id="1"></audio>');
                expect(result).toEqual('<audio data-media-id="1"></audio>');
            });
        });

        describe("sanitiseStoryDescription", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitiseStoryDescription("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("removes script tags", () => {
               let result = htmlSanitizer.sanitiseStoryDescription("<script>console.log('hello world!')</script>");
               expect(result).toEqual("");
            });

            it("removes button tags", () => {
               let result = htmlSanitizer.sanitiseStoryDescription('<button type="submit">Submit!</button>');
               expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<img src="image.png">');
                expect(result).toEqual("");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<audio src="image.png"></audio>');
                expect(result).toEqual("");
            });

            it("allows image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<img data-media-id="1">');
                expect(result).toEqual("");
            });

            it("allows audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseStoryDescription('<audio data-media-id="1"></audio>');
                expect(result).toEqual("");
            });
        });

        describe("sanitiseCollectionDescription", () => {
            it("allows heading tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<h1>Heading</h1>");
                expect(result).toEqual("<h1>Heading</h1>");
            });

            it("allows paragraph tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<p>Paragraph</p>");
                expect(result).toEqual("<p>Paragraph</p>");
            });

            it("allows a tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<a href='http://news.bbc.co.uk' target='_blank'>Link</a>");
                expect(result).toEqual('<a href="http://news.bbc.co.uk" target="_blank">Link</a>');
            });

            it("removes script tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription("<script>console.log('hello world!')</script>");
                expect(result).toEqual("");
            });

            it("removes button tags", () => {
                let result = htmlSanitizer.sanitiseCollectionDescription('<button type="submit">Submit!</button>');
                expect(result).toEqual("Submit!");
            });

            it("removes image tags with src", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<img src="image.png">');
                expect(result).toEqual("");
            });

            it("removes audio tags with src", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<audio src="image.png"></audio>');
                expect(result).toEqual("");
            });

            it("removed image tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<img data-media-id="1">');
                expect(result).toEqual("");
            });

            it("removes audio tags with data-media-id", ()=> {
                let result = htmlSanitizer.sanitiseCollectionDescription('<audio data-media-id="1"></audio>');
                expect(result).toEqual("");
            });
        });
    });
});