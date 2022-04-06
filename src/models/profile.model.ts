import mongoose from 'mongoose';
// interface I_Profile {
//   userId: typeof mongoose.Types.ObjectId;
//   name: string;
//   profileName: string;
//   position: string;
//   email: string;
//   profileLink: string;
//   isEmailSent: boolean;
//   isStared: boolean;
//   isVmarked: boolean;
//   tags: string[];
//   imageSrc: string;
//   comment: string;
//   dateScraped: Date
// }

export interface ProfileDocument extends mongoose.Document {
  //userId: typeof mongoose.Types.ObjectId;
  name: string;
  position: string;
  email: string;
  profileLink: string;
  tags: string[];
  imageSrc: string;
  comment: string;
  isEmailSent: boolean;
  isStared: boolean;
  isVmarked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema:mongoose.Schema<ProfileDocument> = new mongoose.Schema({
  // userId: {
  //   type: String// mongoose.Types.ObjectId,
  //   // required
  // },
  name: String,
  position: String,
  email: String,
  profileLink: {
    type: String,
    unique: true,
  },
  tags: [String],
  imageSrc: String,
  comment: String,
  isEmailSent: {
    type: Boolean,
    default: false,
  },
  isStared: {
    type: Boolean,
    default: false,
  },
  isVmarked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const ProfileModel = mongoose.model<ProfileDocument>('Profile', profileSchema);

export default ProfileModel;
