type TCategory = {
  _id: string;
  type: string;
  isDeleted: boolean;
};

export type TCar = {
  car_image: string;
  category: TCategory;
  color: string;
  description: string;
  features: string[];
  isDeleted: boolean;
  isElectric: boolean;
  name: string;
  pricePerHour: string;
  status: string;
  _id: string;
};
