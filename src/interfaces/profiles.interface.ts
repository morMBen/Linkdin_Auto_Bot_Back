
export interface I_Filter {
  isEmailSent?: boolean;
  isStared?: boolean;
  isVmarked?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface I_Sort {
  field?: string;
  order?: 1 | -1;
}
