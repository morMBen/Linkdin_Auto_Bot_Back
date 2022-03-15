import mongoose from 'mongoose';
// interface I_Profile {
//   userId: typeof mongoose.Types.ObjectId;
//   name: string;
//   profileName: string;
//   position: string;
//   email: string;
//   linkdinLink: string;
//   isEmailSent: boolean;
//   isStared: boolean;
//   isVmarked: boolean;
//   tags: string[];
//   imageSrc: string;
//   comment: string;
//   dateScraped: Date
// }

export interface ProfileDocument extends mongoose.Document {
  userId: string; // typeof mongoose.Types.ObjectId;
  name: string;
  profileName: string;
  position: string;
  email: string;
  linkdinLink: string;
  isEmailSent: boolean;
  isStared: boolean;
  isVmarked: boolean;
  tags: string[];
  imageSrc: string;
  comment: string;
  createdAt: Date
  updatedAt: Date
}

const profileSchema:mongoose.Schema<ProfileDocument> = new mongoose.Schema({
  userId: {
    type: String// mongoose.Types.ObjectId,
    // required
  },
  name: String,
  profileName: String,
  position: String,
  email: String,
  linkdinLink: String,
  isEmailSent: Boolean,
  isStared: Boolean,
  isVmarked: Boolean,
  tags: [String],
  imageSrc: String,
  comment: String,
}, {
  timestamps: true,
});

const ProfileModel = mongoose.model<ProfileDocument>('Profile', profileSchema);

export default ProfileModel;
