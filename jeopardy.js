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

function getCategoryIds(resCats) {
	//Get NUM_CATEGORIES random category from API.
	const randomCats = _.sampleSize(resCats.data, NUM_CATEGORIES);
	let idArr = [];
	for (cat of randomCats) {
		let catId = cat.id;
		idArr.push(catId);
	}
	//Returns array of category ids
	return idArr;
}

function getCategory(catId) {
	let arr = [];
	let count = 0;
	for (data of catId.data) {
		if (count < 5) {
			count++;
			arr.push(data);
		}
	}

	arr.map((arr) => {
		let catData = {
			title: arr.category.title,
			clues: [
				{
					question: arr.question,
					answer: arr.answer,
					showing: null
				}
			]
		};
		categories.push(catData);
	});
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
	let singleTitle = [];
	for (i = 0; i < categories.length; i++) {
		if (categories[i].title !== categories[i + 1].title) {
			singleTitle.push(categories);
		}
	}

	const top = document.createElement("tr");
	for (let x = 0; x < NUM_CATEGORIES; x++) {
		const headCell = document.createElement("td");
		headCell.setAttribute("id", `${x}`);
		top.append(headCell);
	}
	$("thead").append(top);

	for (let y = 0; y < NUM_QUESTIONS_PER_CAT; y++) {
		const row = document.createElement("tr");
		for (let x = 0; x < NUM_CATEGORIES; x++) {
			const cell = document.createElement("td");
			cell.setAttribute("id", `${x}-${y}`);
			cell.innerText = "?";
			row.append(cell);
		}
		$("#jeopardy").append(row);
	}
}
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
	categories = [];
	const resCats = await axios.get("http://jservice.io/api/categories", {
		params: {
			count: 100
		}
	});
	let catIds = getCategoryIds(resCats);

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

/** On click of restart button, restart game. */

// TODO

/** On page load, setup and start & add event handler for clicking clues */

// TODO
