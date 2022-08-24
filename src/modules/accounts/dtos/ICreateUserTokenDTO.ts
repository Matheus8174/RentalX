interface ICreateUserTokenDTO {
  userId: string;
  expiresDate: Date;
  refreshToken: string;
}

export default ICreateUserTokenDTO;
