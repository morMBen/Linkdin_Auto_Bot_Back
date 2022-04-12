import { DocumentDefinition, FilterQuery} from 'mongoose';
import SearchModel, {I_SearchDocument} from '../models/search.model';

export async function add(searchWord: DocumentDefinition<I_SearchDocument>): Promise<void> {
  console.log("add service", searchWord);
    try {
    await SearchModel.create(searchWord);
  } catch (error) {
    throw error;
  }
}

export async function all() {
  try {
    return await SearchModel.find();
  } catch (error) {
    throw error;
  }
}

export async function deleteById(query: FilterQuery<I_SearchDocument>) {
    try {
        return await SearchModel.findByIdAndDelete(query);
    } catch (error) {
        throw error; 
    }
}
