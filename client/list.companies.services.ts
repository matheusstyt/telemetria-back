import { Injectable } from '@nestjs/common';
import { CompaniesServices } from 'src/companies/companies.services';
import { ICompany } from './dto';

@Injectable()
export class ListCompaniesService {
    private companies: ICompany[] = [];
    constructor ( private companiesServices: CompaniesServices ){
        this.companiesServices.list()
        .then((companies: ICompany[]) => {
            companies.forEach((company: ICompany) => {
                console.log(company)
                this.setCompany(company);
            })
        })
    }
    getCompanies(): ICompany[] {
        return this.companies;
    }

    setCompany(company: ICompany): void {
        this.companies.push(company);
    }
}
