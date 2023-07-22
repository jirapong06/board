

function changeTextById(id, text) {
  const element = document.getElementById(id);
  element.textContent = text;
}

function getData(content, startWith, endWith) {
  // const htmlContent = '<div>data-value="bar99_tout">Some content here</div>';
  // const startSubstring = 'data-value="bar99_tout">';
  // const endSubstring = '<';

  const startIndex = content.indexOf(startWith);
  const endIndex = content.indexOf(endWith, startIndex + startWith.length);

  let extractedSubstring;
  if (startIndex !== -1 && endIndex !== -1) {
    extractedSubstring = content.substring(startIndex + startWith.length, endIndex);
  } else {
    extractedSubstring = 'Substring not found';
  }

  // console.log(extractedSubstring);
  return extractedSubstring;

}

function getGoldPrice() {
  const urlToFetch = 'https://www.ylgbullion.co.th/th/gold-price';
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + urlToFetch;
  let getContent = '';

  fetch(proxyUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // This returns a promise with the HTML content
  })
  .then(htmlContent => {
    // Here you can work with the fetched HTML content
    // console.log(htmlContent);
    let ylg9999buy = getData(htmlContent, 'data-value="bar99_tin">', '<');
    let ylg9999sell = getData(htmlContent, 'data-value="bar99_tout">', '<');
    let ylg9999sellg = parseFloat(ylg9999sell.replace(/,/g, '')) / 15.244;
    // ylg9999sellg = ylg9999sellg.toFixed(2);
  
    changeTextById('9999sell', ylg9999sell);
    changeTextById('9999sellg', ylg9999sellg.toLocaleString('en-IN'));
    
  })
  .catch(error => {
    console.error('Error:', error);
  });


}
// Use fetch to make the request to the proxy server

getGoldPrice();

