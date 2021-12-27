// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class MovieProxy {
  public readonly adult: boolean;
  public readonly backdrop_path: string;
  public readonly belongs_to_collection: BelongsToCollectionProxy;
  public readonly budget: number;
  public readonly genres: GenresEntityProxy[] | null;
  public readonly homepage: string;
  public readonly id: number;
  public readonly imdb_id: string;
  public readonly original_language: string;
  public readonly original_title: string;
  public readonly overview: string;
  public readonly popularity: number;
  public readonly poster_path: string;
  public readonly production_companies: ProductionCompaniesEntityProxy[] | null;
  public readonly production_countries: ProductionCountriesEntityProxy[] | null;
  public readonly release_date: string;
  public readonly revenue: number;
  public readonly runtime: number;
  public readonly spoken_languages: SpokenLanguagesEntityProxy[] | null;
  public readonly status: string;
  public readonly tagline: string;
  public readonly title: string;
  public readonly video: boolean;
  public readonly vote_average: number;
  public readonly vote_count: number;
  public static Parse(d: string): MovieProxy {
    return MovieProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): MovieProxy {
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
    checkString(d.backdrop_path, false, field + ".backdrop_path");
    d.belongs_to_collection = d.belongs_to_collection
      ? BelongsToCollectionProxy.Create(
          d.belongs_to_collection,
          field + ".belongs_to_collection"
        )
      : null;
    checkNumber(d.budget, false, field + ".budget");
    checkArray(d.genres, field + ".genres");
    if (d.genres) {
      for (let i = 0; i < d.genres.length; i++) {
        d.genres[i] = GenresEntityProxy.Create(
          d.genres[i],
          field + ".genres" + "[" + i + "]"
        );
      }
    }
    if (d.genres === undefined) {
      d.genres = null;
    }
    checkString(d.homepage, false, field + ".homepage");
    checkNumber(d.id, false, field + ".id");
    checkString(d.imdb_id, false, field + ".imdb_id");
    checkString(d.original_language, false, field + ".original_language");
    checkString(d.original_title, false, field + ".original_title");
    checkString(d.overview, false, field + ".overview");
    checkNumber(d.popularity, false, field + ".popularity");
    checkString(d.poster_path, false, field + ".poster_path");
    checkArray(d.production_companies, field + ".production_companies");
    if (d.production_companies) {
      for (let i = 0; i < d.production_companies.length; i++) {
        d.production_companies[i] = ProductionCompaniesEntityProxy.Create(
          d.production_companies[i],
          field + ".production_companies" + "[" + i + "]"
        );
      }
    }
    if (d.production_companies === undefined) {
      d.production_companies = null;
    }
    checkArray(d.production_countries, field + ".production_countries");
    if (d.production_countries) {
      for (let i = 0; i < d.production_countries.length; i++) {
        d.production_countries[i] = ProductionCountriesEntityProxy.Create(
          d.production_countries[i],
          field + ".production_countries" + "[" + i + "]"
        );
      }
    }
    if (d.production_countries === undefined) {
      d.production_countries = null;
    }
    checkString(d.release_date, false, field + ".release_date");
    checkNumber(d.revenue, false, field + ".revenue");
    checkNumber(d.runtime, false, field + ".runtime");
    checkArray(d.spoken_languages, field + ".spoken_languages");
    if (d.spoken_languages) {
      for (let i = 0; i < d.spoken_languages.length; i++) {
        d.spoken_languages[i] = SpokenLanguagesEntityProxy.Create(
          d.spoken_languages[i],
          field + ".spoken_languages" + "[" + i + "]"
        );
      }
    }
    if (d.spoken_languages === undefined) {
      d.spoken_languages = null;
    }
    checkString(d.status, false, field + ".status");
    checkString(d.tagline, false, field + ".tagline");
    checkString(d.title, false, field + ".title");
    checkBoolean(d.video, false, field + ".video");
    checkNumber(d.vote_average, false, field + ".vote_average");
    checkNumber(d.vote_count, false, field + ".vote_count");
    return new MovieProxy(d);
  }
  private constructor(d: any) {
    this.adult = d.adult;
    this.backdrop_path = d.backdrop_path;
    this.belongs_to_collection = d.belongs_to_collection;
    this.budget = d.budget;
    this.genres = d.genres;
    this.homepage = d.homepage;
    this.id = d.id;
    this.imdb_id = d.imdb_id;
    this.original_language = d.original_language;
    this.original_title = d.original_title;
    this.overview = d.overview;
    this.popularity = d.popularity;
    this.poster_path = d.poster_path;
    this.production_companies = d.production_companies;
    this.production_countries = d.production_countries;
    this.release_date = d.release_date;
    this.revenue = d.revenue;
    this.runtime = d.runtime;
    this.spoken_languages = d.spoken_languages;
    this.status = d.status;
    this.tagline = d.tagline;
    this.title = d.title;
    this.video = d.video;
    this.vote_average = d.vote_average;
    this.vote_count = d.vote_count;
  }
}

export class BelongsToCollectionProxy {
  public readonly id: number;
  public readonly name: string;
  public readonly poster_path: string;
  public readonly backdrop_path: string;
  public static Parse(d: string): BelongsToCollectionProxy {
    return BelongsToCollectionProxy.Create(JSON.parse(d));
  }
  public static Create(
    d: any,
    field: string = "root"
  ): BelongsToCollectionProxy {
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
    checkNumber(d.id, false, field + ".id");
    checkString(d.name, false, field + ".name");
    checkString(d.poster_path, false, field + ".poster_path");
    checkString(d.backdrop_path, false, field + ".backdrop_path");
    return new BelongsToCollectionProxy(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.name = d.name;
    this.poster_path = d.poster_path;
    this.backdrop_path = d.backdrop_path;
  }
}

export class GenresEntityProxy {
  public readonly id: number;
  public readonly name: string;
  public static Parse(d: string): GenresEntityProxy {
    return GenresEntityProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = "root"): GenresEntityProxy {
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
    checkNumber(d.id, false, field + ".id");
    checkString(d.name, false, field + ".name");
    return new GenresEntityProxy(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.name = d.name;
  }
}

export class ProductionCompaniesEntityProxy {
  public readonly id: number;
  public readonly logo_path: string;
  public readonly name: string;
  public readonly origin_country: string;
  public static Parse(d: string): ProductionCompaniesEntityProxy {
    return ProductionCompaniesEntityProxy.Create(JSON.parse(d));
  }
  public static Create(
    d: any,
    field: string = "root"
  ): ProductionCompaniesEntityProxy {
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
    checkNumber(d.id, false, field + ".id");
    checkString(d.logo_path, true, field + ".logo_path");
    checkString(d.name, false, field + ".name");
    checkString(d.origin_country, false, field + ".origin_country");
    return new ProductionCompaniesEntityProxy(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.logo_path = d.logo_path;
    this.name = d.name;
    this.origin_country = d.origin_country;
  }
}

export class ProductionCountriesEntityProxy {
  public readonly iso_3166_1: string;
  public readonly name: string;
  public static Parse(d: string): ProductionCountriesEntityProxy {
    return ProductionCountriesEntityProxy.Create(JSON.parse(d));
  }
  public static Create(
    d: any,
    field: string = "root"
  ): ProductionCountriesEntityProxy {
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
    checkString(d.iso_3166_1, false, field + ".iso_3166_1");
    checkString(d.name, false, field + ".name");
    return new ProductionCountriesEntityProxy(d);
  }
  private constructor(d: any) {
    this.iso_3166_1 = d.iso_3166_1;
    this.name = d.name;
  }
}

export class SpokenLanguagesEntityProxy {
  public readonly english_name: string;
  public readonly iso_639_1: string;
  public readonly name: string;
  public static Parse(d: string): SpokenLanguagesEntityProxy {
    return SpokenLanguagesEntityProxy.Create(JSON.parse(d));
  }
  public static Create(
    d: any,
    field: string = "root"
  ): SpokenLanguagesEntityProxy {
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
    checkString(d.english_name, false, field + ".english_name");
    checkString(d.iso_639_1, false, field + ".iso_639_1");
    checkString(d.name, false, field + ".name");
    return new SpokenLanguagesEntityProxy(d);
  }
  private constructor(d: any) {
    this.english_name = d.english_name;
    this.iso_639_1 = d.iso_639_1;
    this.name = d.name;
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
