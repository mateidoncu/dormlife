export type Rent = {
    _id: string;
    dormRoom: {
      _id: string;
      name: string;
      slug: { current: string };
      price: number;
    };
    contractStartDate: string;
    contractEndDate: string;
    numberOfMonths: number;
    people: number;
    price: number;
  };