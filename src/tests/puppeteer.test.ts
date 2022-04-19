import { editSearchKeyWords } from '../utils/puppeteer.util';
import * as searchServices from '../services/search.service'
// console.log(`Expected value: ${}\nActual value: ${}`);


async function test() {
  try {
    console.log("start");
    
    const keys = await searchServices.all();
    console.log(keys);
    
    console.log(editSearchKeyWords(keys));
    console.log("end");
    
  } catch (error: any) {
    console.log("error");
    
    console.log(error.message || error);
  }
}


test();
