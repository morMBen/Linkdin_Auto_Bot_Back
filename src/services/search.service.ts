import { DocumentDefinition, FilterQuery} from 'mongoose';
import SearchModel, {I_SearchDocument} from '../models/search.model';

export async function add(searchWord: DocumentDefinition<I_SearchDocument>): Promise<void> {
    try {
    await SearchModel.create(searchWord);
  } catch (error) {
    throw error;
  }
}

export async function all() {
  try {
    const res = await SearchModel.find();
    return res;
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
