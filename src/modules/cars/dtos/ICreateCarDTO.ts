interface ICreateCarDTO {
  id?: string;
  name: string;
  available?: boolean;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export default ICreateCarDTO;
