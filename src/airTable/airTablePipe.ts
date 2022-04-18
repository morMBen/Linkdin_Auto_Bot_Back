import Airtable from 'airtable';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../.env') });


const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appq2ntvhHq30MiT8');

