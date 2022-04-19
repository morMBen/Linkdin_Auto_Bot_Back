import Airtable from 'airtable';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../.env') });


const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appq2ntvhHq30MiT8');

base('Table 1').select({
  // Selecting the first 3 records in Grid view:
  maxRecords: 3,
  view: "Grid view",
  fields: ["fldg01YA673VBUzFb", "fldMFOfCBcfw3TVLz"],
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      console.log('Retrieved', record.get("test field 1"));
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { 
    console.error(err); return; 
  }
});


base('Table 1').find('recZleghsupzhi1hF', function(err, record) {
  if (record) { 
    console.log('Retrieved', record.id);
    return; 
  }

  console.error(err); 
});
