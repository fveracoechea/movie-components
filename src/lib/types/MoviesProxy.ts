// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class MoviesProxy {
  public readonly dates: DatesProxy | null;
  public readonly page: number;
  public readonly results: ResultsEntityProxy[] | null;
  public readonly total_pages: number;
  public readonly total_results: number;
  public static Parse(d: string): MoviesProxy {
    return MoviesProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): MoviesProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    d.dates = d.dates ? DatesProxy.Create(d.dates, field + ".dates") : null;
    checkNumber(d.page, false, field + ".page");
    checkArray(d.results, field + ".results");
    if (d.results) {
      for (let i = 0; i < d.results.length; i++) {
        d.results[i] = ResultsEntityProxy.Create(
          d.results[i],
          field + ".results" + "[" + i + "]"
        );
      }
    }
    if (d.results === undefined) {
      d.results = null;
    }
    checkNumber(d.total_pages, false, field + ".total_pages");
    checkNumber(d.total_results, false, field + ".total_results");
    return new MoviesProxy(d);
  }
  private constructor(d: any) {
    this.dates = d.dates;
    this.page = d.page;
    this.results = d.results;
    this.total_pages = d.total_pages;
    this.total_results = d.total_results;
  }
}

export class DatesProxy {
  public readonly maximum: string;
  public readonly minimum: string;
  public static Parse(d: string): DatesProxy {
    return DatesProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): DatesProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.maximum, false, field + ".maximum");
    checkString(d.minimum, false, field + ".minimum");
    return new DatesProxy(d);
  }
  private constructor(d: any) {
    this.maximum = d.maximum;
    this.minimum = d.minimum;
  }
}

export class ResultsEntityProxy {
  public readonly adult: boolean;
  public readonly backdrop_path: string | null;
  public readonly genre_ids: number[] | null;
  public readonly id: number;
  public readonly original_language: string;
  public readonly original_title: string;
  public readonly overview: string;
  public readonly popularity: number;
  public readonly poster_path: string;
  public readonly release_date: string;
  public readonly title: string;
  public readonly video: boolean;
  public readonly vote_average: number;
  public readonly vote_count: number;
  public static Parse(d: string): ResultsEntityProxy {
    return ResultsEntityProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): ResultsEntityProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof d !== "object") {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkBoolean(d.adult, false, field + ".adult");
    checkString(d.backdrop_path, true, field + ".backdrop_path");
    checkArray(d.genre_ids, field + ".genre_ids");
    if (d.genre_ids) {
      for (let i = 0; i < d.genre_ids.length; i++) {
        checkNumber(
          d.genre_ids[i],
          false,
          field + ".genre_ids" + "[" + i + "]"
        );
      }
    }
    if (d.genre_ids === undefined) {
      d.genre_ids = null;
    }
    checkNumber(d.id, false, field + ".id");
    checkString(d.original_language, false, field + ".original_language");
    checkString(d.original_title, false, field + ".original_title");
    checkString(d.overview, false, field + ".overview");
    checkNumber(d.popularity, false, field + ".popularity");
    checkString(d.poster_path, false, field + ".poster_path");
    checkString(d.release_date, false, field + ".release_date");
    checkString(d.title, false, field + ".title");
    checkBoolean(d.video, false, field + ".video");
    checkNumber(d.vote_average, false, field + ".vote_average");
    checkNumber(d.vote_count, false, field + ".vote_count");
    return new ResultsEntityProxy(d);
  }
  private constructor(d: any) {
    this.adult = d.adult;
    this.backdrop_path = d.backdrop_path;
    this.genre_ids = d.genre_ids;
    this.id = d.id;
    this.original_language = d.original_language;
    this.original_title = d.original_title;
    this.overview = d.overview;
    this.popularity = d.popularity;
    this.poster_path = d.poster_path;
    this.release_date = d.release_date;
    this.title = d.title;
    this.video = d.video;
    this.vote_average = d.vote_average;
    this.vote_count = d.vote_count;
  }
}

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, "non-nullable object", false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function checkArray(d: any, field: string): void {
  if (!Array.isArray(d) && d !== null && d !== undefined) {
    errorHelper(field, d, "array", true);
  }
}
function checkNumber(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== "number" &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, "number", nullable);
  }
}
function checkBoolean(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== "boolean" &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, "boolean", nullable);
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (
    typeof d !== "string" &&
    (!nullable || (nullable && d !== null && d !== undefined))
  ) {
    errorHelper(field, d, "string", nullable);
  }
}
function errorHelper(
  field: string,
  d: any,
  type: string,
  nullable: boolean
): never {
  if (nullable) {
    type += ", null, or undefined";
  }
  throw new TypeError(
    "Expected " +
      type +
      " at " +
      field +
      " but found:\n" +
      JSON.stringify(d) +
      "\n\nFull object:\n" +
      JSON.stringify(obj)
  );
}
