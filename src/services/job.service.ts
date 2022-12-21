import {CrudService} from "./crud.service";
import {Job} from "../models/job.model";

export class JobService extends CrudService<Job> {
    constructor() {
        super("/jobs");
    }
}
