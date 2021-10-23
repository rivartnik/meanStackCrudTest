export class Bucket {
  _id!: string;
  name!: string;
  location!: Location;
}

export class Location {
  _id!: string;
  name!: string;
}

export class File {
  _id!: string;
  name!: string;
  last_modified!: Date;
  size!: number;
  id_bucket!:string
}
