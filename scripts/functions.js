
function loadPage() {
	// initialize slide-tagline 01
	genSlideTagline (slides, 0, slidesPath) ;

	// initialize bullets at slide 01
	generateBullets() ; 

	// click events listening on arrows left / right (slide change)
	// arrow left
	let leftArr = document.querySelector (".arrow_left") ; 
	leftArr.addEventListener ("click" , () => { 
		moveBack(slidesPath) ; 
	} ) ; 

	// arrow right
	let rightArr = document.querySelector(".arrow_right"); 
	rightArr.addEventListener ("click" , () => { 
		moveNext(slidesPath) ; 
	} ) ; 
}

// ------- GENERATE SLIDES -------

function genSlide ( path , arrIndex) {
/* 	Function to generate and display a slide on home page
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

function genTagline (array , arrIndex) {
/* 	Function to generate and display a tagline on home page
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

function genSlideTagline (array, arrayIndex, path) {
// Function to display a slide with a tagline on it (home page)
	genSlide (path, arrayIndex) ; 
	genTagline (array, arrayIndex) ; 
}

// -------  GENERATE BULLETS  -------

function generateBullets () {
	// initialize full bullet associated with 1st slide, at index 0 of "slides" array
	let fullBullet = document.createElement ("div") ; 
	fullBullet.setAttribute ("id" , "bullet0") ; // bullet id value = "bullet" + "slides" array index number
	fullBullet.classList.add("dot_selected") ;  
	dotsContainer.appendChild(fullBullet) ;

	let i = 1; // 1st bullet (id = slide0) already declared
	let emptyBulletString = "" ; 
	let emptyBulletsNb = slides.length-1 ; 
	
 	while (i <= emptyBulletsNb ) {
		emptyBulletString = "<div class='dot' id='bullet" + i + "'></div>" ; // bullet id value = "bullet" + "slides" array index number

		// insert new empty bullet after container last child
		dotsContainer.insertAdjacentHTML("beforeend" , emptyBulletString) ; 
		i++ ;  
	} 
}

//  -------  UPDATE SLIDES  -------
const currentSlide = () => {
/* 	Function to detect current banner slide name (file name without extension)
	Parameters : none.
	Return : array with file name of slide without extension, at index 0.
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
	const indexFound = array.findIndex ( 
		(tabElt) => {
			const fileName = tabElt[objKey].split(".") [0] ; // extract slide file name without extension
			return fileName.includes(slideName) ;   // string.includes
	} ) ;

	return indexFound;
}

const changeSlide = (array , newIndex , slidesPath) => {
	document.querySelector(".banner-img").src = slidesPath + array[newIndex].image ; 
}

const changeTagline = (array , newIndex) => {
	document.querySelector ("#banner p").innerHTML = array[newIndex].tagLine ; 
}

const changeSlideTagline = (array , newIndex , slidesPath) => {  
	changeSlide (array , newIndex , slidesPath) ; 
	changeTagline (array , newIndex) ; 
}

// -------  UPDATE BULLETS  -------

const toEmptyBullet = () => {
	/* Function that detects the full bullet and turns it into empty one. 
		Parameters : none. 
		Return : none (change made directly in DOM by changing element className)
	*/
		  let fullBullet = document.querySelector (".dots .dot_selected"); 
		  fullBullet.classList.replace("dot_selected" , "dot") ; 
	}
	
const toFullBullet = (index) => {
/* Function t
	Parameters : 1 -> index
	Return : none (change made directly in DOM by changing element className)
*/
	let bulletId = "#bullet" + index ; 
	let emptyBullet = document.querySelector(bulletId) ; 
	emptyBullet.classList.replace("dot" , "dot_selected") ;
}

// -------  UPDATE SLIDES + BULLETS  -----
// Functions listened to by arrows event listeners 
const moveNext = (slidesPath) => { 

	// catch current slide object
	let curtSlide = currentSlide() ;  

	// Slide current index in array (object image key)
	let index = findArrIndex(slides, "image" , curtSlide) ; 

	// if current slide is not the last one in array
	if ( index < slidesMaxIndex ) { 
		// index increment
		index++ ;  

		// display slide at incremented index in "slides" array
		changeSlideTagline (slides , index , slidesPath) ; 

		toEmptyBullet(); 
		toFullBullet(index); 

	// else, if current slide is the last one in array
	} else { 
		index = 0 ; 
		// back to first slide
		changeSlideTagline (slides , index , slidesPath) ; 
		toEmptyBullet() ; 
		toFullBullet(index) ; 
	}
}

const moveBack = (slidesPath) => {
	// local variables : 
	let lastIndex = slides.length-1 ; // last "slides" array index
	let curtSlide = currentSlide() ;  // current slide object
	let index = findArrIndex(slides, "image" , curtSlide) ; // Slide current index in array (object image key)

	if (index === 0) {
		changeSlideTagline (slides , slidesMaxIndex , slidesPath) ; 
		toEmptyBullet() ;  
		toFullBullet(lastIndex) ; 
	}else{
		// index decrement
		index-- ;  

		// display slide at incremented index
		changeSlideTagline (slides , index , slidesPath) ; 
		toEmptyBullet() ; 
		toFullBullet(index) ; 
	}
}




