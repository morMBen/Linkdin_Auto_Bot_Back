import Airtable, { base } from 'airtable';
import { config } from 'dotenv';
import * as path from 'path';
import * as profileServices from '../services/profile.service';
import { reformatMongoToAirTable } from '../utils/airTable.util';


import { connectDb, disconnectDb } from '../database/connect'; // TODO: remove line
connectDb(); // TODO: remove line

config({ path: path.resolve(__dirname, '../.env') });

const updateTable = async () => {  
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_KEY || '');

    const profilesData = await profileServices.getProfiles([{ $match: {} }]);
    const airTableData = reformatMongoToAirTable(profilesData);    
    // const airTableDataJSON = JSON.stringify(airTableData);
    
    console.log("profilesData.length = ", profilesData.length);
    const promises = airTableData.map((batch) => {
      base.table('Table1').create(batch)
      .catch((error: any) => {
        console.error(error);
      })
    });

    Promise.all(promises);
    // console.log({records});
  } catch (error: any) {
    console.error( error); // `Error: ${error.message}` ||
    // throw error;
  } finally {
    disconnectDb(); // TODO: remove line
  }
}

updateTable();



