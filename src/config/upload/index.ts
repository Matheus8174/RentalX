import multer, { Options } from 'multer';

class Upload {
  constructor(
    private readonly config: Options,
    private readonly fildName: string
  ) {}

  public execute() {
    return multer(this.config).single(this.fildName);
  }
}

export default Upload;
