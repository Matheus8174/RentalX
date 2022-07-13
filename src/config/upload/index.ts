import multer, { Options } from 'multer';

type MulterWays = 'single' | 'array';

class Upload {
  constructor(
    private readonly config: Options,
    private readonly fildName: string,
    private readonly type: MulterWays
  ) {}

  public execute() {
    return multer(this.config)[this.type](this.fildName);
  }
}

export default Upload;
