import { ProfileDocument } from "../models/profile.model";


interface I_AirTable {
  fields: {
    LinkedIn: string;
    Name: string;
    Added: string;
    Comment: string;
    Done: string;
    Favorite: string;
  }
}


export const reformatMongoToAirTable = (profilesData: ProfileDocument[]): string[] => {
  const airTableObjs = createAirTableObj(profilesData);
  return createMatrix(airTableObjs);
}


const createMatrix = (airTableObjs: I_AirTable[]): string[] => {
  const matrix: string[] = [];

  for (let i = 0; i < 5; ++i) {
    let tempArray = [];
    for (let j = i * 10, k = 1; k % 11 !== 0 && j < airTableObjs.length; ++j, ++k) {
      tempArray.push(airTableObjs[j]);
    }

    matrix.push(JSON.stringify(tempArray));
  }

  return matrix
}


const createAirTableObj = (profilesData: ProfileDocument[]): I_AirTable[] => {
  return profilesData.map((profile) => {
    return {
      fields: {
        LinkedIn: profile.profileLink,
        Name: profile.name,
        Added: getDatePortion(profile.createdAt),
        Comment: profile.comment,
        Done: profile.isVmarked ? "V" : "",
        Favorite: profile.isStared ? "V" : "",
      },
      typecast:true,
    }
  })
}


const getDatePortion = (date: Date): string => {  
  const monthNum = date.getMonth();
  const yearNum = date.getFullYear();
  let day = date.getDate().toString();
    
  let month = (monthNum + 1).toString();
  let year = yearNum.toString().substring(-2);
  
  if (day.length === 1) {
    day = "0" + day;
  }
  
  if (month.length === 1) {
    month = "0" + month;
  }
  
  return `${day}/${month}/${year}`;
}
