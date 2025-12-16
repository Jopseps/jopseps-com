document.addEventListener("DOMContentLoaded", initializeWikiPage);

// Initializes the wiki page by fetching data and building the page dynamically.
async function initializeWikiPage() {
    const article = document.getElementById("article");
    const tocList = document.getElementById("wiki-toc-list");
    
    try {
        let currentURL = (document.URL);
        let part = currentURL.split("/")[1];
        const response = await fetch("https://jopseps-com-antisslopedi.yusufmertturan.workers.dev/" || "/files/js/test.json", {
            body: part
        }); // Adjust the path if needed
        const data = await response.json();

        if (article && tocList) {
            populateArticleContent(article, data);
            buildWikiTOC(article, tocList);
        }
    } catch (error) {
        console.error("Error fetching or processing JSON data:", error);
    }
}

// Populates the article content based on the JSON data.
function populateArticleContent(article, data) {
    // Clear existing content
    article.innerHTML = "";

    // Add the title
    const title = document.createElement("h1");
    title.textContent = data.meta.title;
    article.appendChild(title);

    // Add the image
    if (data.image) {
        const img = document.createElement("img");
        img.src = data.image.src;
        img.alt = data.image.alt;
        article.appendChild(img);

        if (data.image.caption) {
            const caption = document.createElement("p");
            caption.textContent = data.image.caption;
            caption.style.fontStyle = "italic";
            article.appendChild(caption);
        }
    }

    // Add the overview
    if (data.overview) {
        const overview = document.createElement("p");
        overview.textContent = data.overview.text;
        article.appendChild(overview);
    }

    // Add the content body
    if (data.content_body) {
        data.content_body.forEach((section) => {
            const sectionElement = document.createElement(section.level);
            sectionElement.textContent = section.section_title;
            article.appendChild(sectionElement);

            const text = document.createElement("p");
            text.textContent = section.text;
            article.appendChild(text);

            if (section.subsections) {
                section.subsections.forEach((subsection) => {
                    const subsectionElement = document.createElement(subsection.level);
                    subsectionElement.textContent = subsection.section_title;
                    article.appendChild(subsectionElement);

                    const subText = document.createElement("p");
                    subText.textContent = subsection.text;
                    article.appendChild(subText);
                });
            }
        });
    }
}

// Converts a given text into a URL-friendly "slug" format.
function slugify(text) {
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

// Builds the table of contents by scanning the article for headings and adding them to the TOC container.
function buildWikiTOC(article, tocList) {
    const headings = article.querySelectorAll("h2, h3");
    const idCounts = {};

    headings.forEach((heading) => {
        const id = generateUniqueID(heading.textContent || heading.innerText || "section", idCounts);
        heading.id = heading.id || id;

        const listItem = createTOCListItem(heading, id);
        tocList.appendChild(listItem);
    });
}

// Generates a unique ID for a heading based on its text content, ensuring no duplicate IDs.
function generateUniqueID(baseText, idCounts) {
    const base = slugify(baseText);
    let id = base;

    if (idCounts[base] !== undefined) {
        idCounts[base] += 1;
        id = `${base}-${idCounts[base]}`;
    } else {
        idCounts[base] = 0;
    }

    return id;
}

// Creates a list item for the TOC, linking to the corresponding heading in the article.
function createTOCListItem(heading, id) {
    const listItem = document.createElement("li");
    if (heading.tagName.toLowerCase() === "h3") {
        listItem.style.marginLeft = "16px";
    }

    const anchor = document.createElement("a");
    anchor.href = `#${id}`;
    anchor.textContent = heading.textContent;
    anchor.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
    });

    listItem.appendChild(anchor);
    return listItem;
}