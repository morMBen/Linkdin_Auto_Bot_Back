import { I_Filter, I_Sort } from '../interfaces/profiles.interface';

const TESTER: I_Filter = {
  isEmailSent: false,
  isStared: false,
  isVmarked: false,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const iFilterGuard = (filter: any): boolean => {  
  for (const key in filter) {
    if (!(key in TESTER) || typeof filter[key] !== typeof TESTER[key as keyof typeof TESTER]) {
      
      return false;
    }
  }
  
  return true;
}


export const iSortGuard = (sortBy: any): boolean => {
  const { field, order } = sortBy;
  
  if (!field && order) return false
  if (!(field in TESTER)) return false;
  if (order !== 1 && order !== -1) return false;
  
  return true
}
