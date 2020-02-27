const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
let categories = [];

// categories is the main data structure for the app; it looks like this:
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

function getCategoryIds(catIds) {
	let randomIds = _.sampleSize(catIds.data, NUM_CATEGORIES);
	let categoryIds = [];
	for (cat of randomIds) {
		categoryIds.push(cat.id);
	}
	return categoryIds;
}
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategory(catId) {
	let cat = catId.data;
	let cluesArr = [];
	let clues = _.sampleSize(cat, NUM_QUESTIONS_PER_CAT);
	let catData = {
		title: cat[0].category.title,
		clues: []
	};

	clues.map((arr) => {
		let cluesArr = {
			question: arr.question,
			answer: arr.answer,
			showing: null
		};
		catData.clues.push(cluesArr);
	});

	categories.push(catData);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function fillTable() {
	let titles = categories.map((title) => {
		return title.title;
	});

	const jeoparyBoard = $("#jeopardy");
	const topRow = document.createElement("tr");

	for (let x = 0; x < NUM_CATEGORIES; x++) {
		const catHeader = document.createElement("td");
		catHeader.innerText = titles[x];
		topRow.append(catHeader);
	}
	jeoparyBoard.append(topRow);

	for (let y = 0; y < NUM_QUESTIONS_PER_CAT; y++) {
		const row = document.createElement("tr");
		for (let x = 0; x < NUM_CATEGORIES; x++) {
			const cell = document.createElement("td");
			cell.innerText = "?";
			row.append(cell);
		}
		jeoparyBoard.append(row);
	}
}

// cell.innerText = categories[x].clues[y].question;

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function handleClick(evt) {}
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function setupAndStart() {
	const resCategories = await axios.get("http://jservice.io/api/categories", {
		params: {
			count: 50
		}
	});
	let catIds = getCategoryIds(resCategories);

	for (id of catIds) {
		const resTitles = await axios.get("http://jservice.io/api/clues", {
			params: {
				category: id
			}
		});
		getCategory(resTitles);
	}
	fillTable();
}
/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

// TODO
/** On click of restart button, restart game. */

// TODO
/** On page load, setup and start & add event handler for clicking clues */
