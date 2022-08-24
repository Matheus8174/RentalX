interface ICreateRentalDTO {
  id?: string;
  userId: string;
  carId: string;
  expectedReturnDate: Date;
  total?: number;
}

export default ICreateRentalDTO;
