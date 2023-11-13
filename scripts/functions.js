
function loadPage() {
	let slidesPath = "./assets/images/slideshow/" ; 

	// initialize slide-tagline 01
	createSlideTagline (slides, 0, slidesPath) ;

	// click events listening on arrows left / right (slide change)
	let leftArr = document.querySelector (".arrow_left") ; 
	leftArr.addEventListener ("click" , () => { alert("Le clic gauche fonctionne") ; } ) ; 


	// ------- TESTS ARROW RIGHT -------

	let rightArr = document.querySelector(".arrow_right"); 

	rightArr.addEventListener ("click" , () => { 
		// current slide
		let curtSlide = currentSlide() ; 

		// current index where slide is in array
		let index = findArrIndex(slides, "image" , curtSlide) ; 

		if ( index < slides.length ) { 
			// index increment
			index++ ; 	

			// display slide at incremented index
			document.querySelector(".banner-img").src = slidesPath + slides[index].image ; 
		} 


	} ) ; 

	



}

function createSlide ( path , arrIndex) {
/* 	Function to create and display a slide on home page
	Parameters : 2 
		-> slide file absolute path (type = string)
		-> slide file name (type = string)
*/
	let slide = document.createElement("img") ; 
	let parentElt = document.getElementById("banner") ; 
	slide.setAttribute("class" , "banner-img") ; 
	slide.setAttribute("src" , path + slides[arrIndex].image) ; 
	parentElt.appendChild(slide) ;
}

function createTagline (array , arrIndex) {
/* 	Function to create and display a tagline on home page
Parameters : 2 
	-> array containing tagline
	-> array index where tagline is
*/
	let taglineString = array[arrIndex].tagLine ; 
	let slideTitle = document.createElement("p") ; 
	let parentElt = document.getElementById("banner") ; 
	parentElt.appendChild(slideTitle) ; 

	document.querySelector("#banner p").innerHTML = `${taglineString}` ; 
}

function createSlideTagline (array, arrayIndex, path) {
// Function to display a slide with a tagline on it (home page)
	createSlide (path, arrayIndex) ; 
	createTagline (array, arrayIndex) ; 
}

const currentSlide = () => {
/* 	Function to detect current banner slide name (file name without extension)
	Parameters : none.
	Return : file name of slide without extension.
*/
	// catch current innerHTML image 
	let bannerImgObj = document.querySelector ("#banner img[class='banner-img']") ;  

	let slideFile = bannerImgObj.getAttribute("src") ; 

	// regular expression to extract "slide" + digit number
	const regexp01 = /slide\d+/ ; 

	// extraction of "slide+number" from slide file absolute path
	let slide = slideFile.match(regexp01) ; 

	return slide; 
}

const findArrIndex = (array , objKey , slideName) => {
/*
	Function to find array index where a slide is stored. 
	Array of objects { slide filename , tagline } . 
	Parameters : 3 
		-> array to parse, 
		-> object key in array where to find slide (type = string) , 
		-> slide picture to search for (slide file name without extension, type = string)
	Return : array index where slide found
*/
	const indexFound = array.findIndex ( (tabElt) => {
		const fileName = tabElt[objKey].split(".") [0] ;
		return fileName.includes(slideName) ;   // string.includes
	} ) ;

	return indexFound;
}

const moveNext = (previousIndex , newIndex) => {

	document.querySelector(".banner-img").src = slidesPath + slides[index].image ; 
}




// ----------------------------------------------

// Function to move to previous slide
	// if slide is 1st one, move to last slide
		// count number of slides in array of slides pix


// -------  BULLETS  ------- 

//	Number of bullets in .dots container
let dotsContainer = document.querySelector(".dots") ; 
let eltsCount = dotsContainer.childElementCount ; 
console.log ("Il y a " + eltsCount + " bullets dans le conteneur.") ; 





