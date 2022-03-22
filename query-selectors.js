// URL of search: ?keywords=stealth, filter: people 
await
page.goto('https://www.linkedin.com/search/results/people/?geoUrn=%5B%22101620260%22%5D&keywords=stealth%20Co-Founder%20ceo%20cto&origin=FACETED_SEARCH&sid=7kR');
// checked 

// link to profile (retrieve href from node list) 
document.querySelectorAll('span.entity-result__title-line.entity-result__title-line--2-lines > span > a')
// checked 

// profile picture 
document.querySelector('div > div > div > button > img').src;
// checked 

// Name 
document.querySelector('h1');
// checked 

// title 
document.querySelector('div.text-body-medium.break-words').innerText;
// checked 


// contact info button 
document.querySelector('#top-card-text-details-contact-info').href;
// checked 


// linkedin profile 
document.querySelector('div > section.pv-contact-info__contact-type.ci-vanity-url > div > a').href;
// checked 


// website 
document.querySelector('section.pv-contact-info__contact-type.ci-websites > ul > li > div > a').href;
// checked 


// close modal button 
document.querySelector('div[role=dialog] > button');
// checked 


// next page in list 
document.querySelector('div.artdeco-pagination.artdeco-pagination--has-controls > button[aria-label=Next]');
// checked 
