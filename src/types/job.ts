export interface Job {
    adref:               string;
    latitude:            number;
    location:            Location;
    category:            Category;
    salary_max:          number;
    created:             Date;
    salary_is_predicted: string;
    salary_min:          number;
    description:         string;
    contract_type:       string;
    redirect_url:        string;
    company:             Company;
    id:                  string;
    __CLASS__:           string;
    longitude:           number;
    title:               string;
}

export interface Category {
    __CLASS__: string;
    tag:       string;
    label:     string;
}

export interface Company {
    display_name: string;
    __CLASS__:    string;
}

export interface Location {
    area:         string[];
    __CLASS__:    string;
    display_name: string;
}
