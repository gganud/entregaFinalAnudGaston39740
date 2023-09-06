/* import { faker } from '@faker-js/faker';
import chai from "chai";

import config from "../config/index.js";
import DbFactory from "../data/factories/dbFactory.js";

const expect = chai.expect;

const db = DbFactory.create(config.db);

import UserMongooseRepository from "../data/repositories/mongoose/userMongooseRepository.js";

describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init(config.dbUriTests);
        this.userRepository = new UserMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>{
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
                expect(result.pagination.page).to.be.equals(1);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };

        return this.userRepository
            .create(user)
            .then(result =>{
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.lastName).to.be.equals(user.lastName);
                expect(result.email).to.be.equals(user.email);
                expect(result.age).to.be.equals(user.age);
                expect(result.isAdmin).to.be.equals(user.isAdmin);
            }
        );
    });
});
 */
