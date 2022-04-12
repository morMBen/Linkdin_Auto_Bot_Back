import mongoose from 'mongoose';

export interface I_SearchDocument extends mongoose.Document {
  searchWord: string;
}

const SearchSchema: mongoose.Schema<I_SearchDocument> = new mongoose.Schema({
  searchWord: { type: String, unique: true },
});

const SearchModel = mongoose.model<I_SearchDocument>('Search', SearchSchema);

export default SearchModel;
