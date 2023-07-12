const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/rsc/");
	eleventyConfig.addWatchTarget("./src/rsc/")

	const markdownOptions = {
		html: true,
		breaks: true,
		linkify: true
	};
	const markdownRenderer = markdownIt(markdownOptions)

  eleventyConfig.addFilter("markdown", (content) => {
    return markdownRenderer.render(content);
  });

	eleventyConfig.addFilter("split", (content, splitString) => {
		if (!content) {
			return []
		}
		return content.split(splitString)
	})

	eleventyConfig.addPairedShortcode("markdown", (content) => {
    return markdownRenderer.render(content);
  })

	return {
		dir: {
			input: "src",
			output: "public"
		},
		markdownTemplateEngine: "njk"
	}
}