// To parse this data:
//
//   import { Convert, Job } from "./file";
//
//   const job = Convert.toJob(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Job {
  status: string;
  request_id: string;
  parameters: Parameters;
  data: Datum[];
}

export interface Datum {
  employer_name: string;
  employer_logo: null | string;
  employer_website: null | string;
  employer_company_type: null | string;
  job_publisher: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: Date;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[] | null;
  job_google_link: string;
  job_offer_expiration_datetime_utc: Date;
  job_offer_expiration_timestamp: number;
  job_required_experience: JobRequiredExperience;
  job_required_skills: string[] | null;
  job_required_education: JobRequiredEducation;
  job_experience_in_place_of_education: boolean;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: null | string;
  job_salary_period: null | string;
  job_highlights: JobHighlights;
  job_job_title: null;
}

export interface JobHighlights {
  Qualifications?: string[];
  Responsibilities?: string[];
  Benefits?: string[];
}

export interface JobRequiredEducation {
  postgraduate_degree: boolean;
  professional_certification: boolean;
  high_school: boolean;
  associates_degree: boolean;
  bachelors_degree: boolean;
  degree_mentioned: boolean;
  degree_preferred: boolean;
  professional_certification_mentioned: boolean;
}

export interface JobRequiredExperience {
  no_experience_required: boolean;
  required_experience_in_months: number | null;
  experience_mentioned: boolean;
  experience_preferred: boolean;
}

export interface Parameters {
  query: string;
  page: number;
  num_pages: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toJob(json: string): Job {
    return cast(JSON.parse(json), r("Job"));
  }

  public static jobToJson(value: Job): string {
    return JSON.stringify(uncast(value, r("Job")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Job: o(
    [
      { json: "status", js: "status", typ: "" },
      { json: "request_id", js: "request_id", typ: "" },
      { json: "parameters", js: "parameters", typ: r("Parameters") },
      { json: "data", js: "data", typ: a(r("Datum")) },
    ],
    false
  ),
  Datum: o(
    [
      { json: "employer_name", js: "employer_name", typ: "" },
      { json: "employer_logo", js: "employer_logo", typ: u(null, "") },
      { json: "employer_website", js: "employer_website", typ: u(null, "") },
      {
        json: "employer_company_type",
        js: "employer_company_type",
        typ: u(null, ""),
      },
      { json: "job_publisher", js: "job_publisher", typ: "" },
      { json: "job_id", js: "job_id", typ: "" },
      {
        json: "job_employment_type",
        js: "job_employment_type",
        typ: r("JobEmploymentType"),
      },
      { json: "job_title", js: "job_title", typ: "" },
      { json: "job_apply_link", js: "job_apply_link", typ: "" },
      { json: "job_description", js: "job_description", typ: "" },
      { json: "job_is_remote", js: "job_is_remote", typ: true },
      {
        json: "job_posted_at_timestamp",
        js: "job_posted_at_timestamp",
        typ: 0,
      },
      {
        json: "job_posted_at_datetime_utc",
        js: "job_posted_at_datetime_utc",
        typ: Date,
      },
      { json: "job_city", js: "job_city", typ: "" },
      { json: "job_state", js: "job_state", typ: r("JobState") },
      { json: "job_country", js: "job_country", typ: r("JobCountry") },
      { json: "job_latitude", js: "job_latitude", typ: 3.14 },
      { json: "job_longitude", js: "job_longitude", typ: 3.14 },
      { json: "job_benefits", js: "job_benefits", typ: u(a(""), null) },
      { json: "job_google_link", js: "job_google_link", typ: "" },
      {
        json: "job_offer_expiration_datetime_utc",
        js: "job_offer_expiration_datetime_utc",
        typ: Date,
      },
      {
        json: "job_offer_expiration_timestamp",
        js: "job_offer_expiration_timestamp",
        typ: 0,
      },
      {
        json: "job_required_experience",
        js: "job_required_experience",
        typ: r("JobRequiredExperience"),
      },
      {
        json: "job_required_skills",
        js: "job_required_skills",
        typ: u(a(""), null),
      },
      {
        json: "job_required_education",
        js: "job_required_education",
        typ: r("JobRequiredEducation"),
      },
      {
        json: "job_experience_in_place_of_education",
        js: "job_experience_in_place_of_education",
        typ: true,
      },
      { json: "job_min_salary", js: "job_min_salary", typ: u(0, null) },
      { json: "job_max_salary", js: "job_max_salary", typ: u(0, null) },
      {
        json: "job_salary_currency",
        js: "job_salary_currency",
        typ: u(null, ""),
      },
      { json: "job_salary_period", js: "job_salary_period", typ: u(null, "") },
      { json: "job_highlights", js: "job_highlights", typ: r("JobHighlights") },
      { json: "job_job_title", js: "job_job_title", typ: null },
    ],
    false
  ),
  JobHighlights: o(
    [
      {
        json: "Qualifications",
        js: "Qualifications",
        typ: u(undefined, a("")),
      },
      {
        json: "Responsibilities",
        js: "Responsibilities",
        typ: u(undefined, a("")),
      },
      { json: "Benefits", js: "Benefits", typ: u(undefined, a("")) },
    ],
    false
  ),
  JobRequiredEducation: o(
    [
      { json: "postgraduate_degree", js: "postgraduate_degree", typ: true },
      {
        json: "professional_certification",
        js: "professional_certification",
        typ: true,
      },
      { json: "high_school", js: "high_school", typ: true },
      { json: "associates_degree", js: "associates_degree", typ: true },
      { json: "bachelors_degree", js: "bachelors_degree", typ: true },
      { json: "degree_mentioned", js: "degree_mentioned", typ: true },
      { json: "degree_preferred", js: "degree_preferred", typ: true },
      {
        json: "professional_certification_mentioned",
        js: "professional_certification_mentioned",
        typ: true,
      },
    ],
    false
  ),
  JobRequiredExperience: o(
    [
      {
        json: "no_experience_required",
        js: "no_experience_required",
        typ: true,
      },
      {
        json: "required_experience_in_months",
        js: "required_experience_in_months",
        typ: u(0, null),
      },
      { json: "experience_mentioned", js: "experience_mentioned", typ: true },
      { json: "experience_preferred", js: "experience_preferred", typ: true },
    ],
    false
  ),
  Parameters: o(
    [
      { json: "query", js: "query", typ: "" },
      { json: "page", js: "page", typ: 0 },
      { json: "num_pages", js: "num_pages", typ: 0 },
    ],
    false
  ),
  JobCountry: ["US"],
  JobEmploymentType: ["FULLTIME"],
  JobState: ["TX"],
};
