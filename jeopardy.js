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
	const NUM_CATEGORIES = 6;
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
	catId.data.map((arr) => {
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
		return catData;
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

async function fillTable() {
	const table = $("#jeopardy");
	const thead = $("thead");
	const tbody = $("tbody");
	console.log(table);
	console.log(thead);
	console.log(tbody);
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
