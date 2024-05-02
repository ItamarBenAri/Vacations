import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { app } from "../src/app";
import { VacationModel } from "../src/3-models/vacation-model";
import fs from "fs";
import { StatusCode } from "../src/3-models/enums";

describe("Testing VacationsController", () => {

    let image: Buffer; // The image to send
    let imageForUpdate: Buffer; // The image to send
    let token: string; // Token for login.
    let vacationAddedId: number; // Token for login.

    before(async () => { // Run once before all following tests
        image = fs.readFileSync(__dirname + "\\resources\\vacation-image.jpg");
        imageForUpdate = fs.readFileSync(__dirname + "\\resources\\vacation-update-image.jpg");
        const response = await supertest(app.server).post("/api/login")
            .send({ email: "etamar234@gmail.com", password: "1234" });
        token = response.body;
    });

    it("Should return vacations array", async () => {
        const response = await supertest(app.server).get("/api/vacations/36")
            .set("Authorization", "Bearer " + token);
        const vacations: VacationModel[] = response.body;
        expect(vacations.length).to.be.greaterThanOrEqual(1);
        expect(vacations[0]).to.contain.keys("id", "destination", "description", "startVacation", "endVacation", "price", "imageUrl", "isLiked", "likesCount");
    });

    it("Should return a single vacation", async () => {
        const response = await supertest(app.server).get("/api/vacations/vacation/12")
            .set("Authorization", "Bearer " + token);
        const vacations: VacationModel = response.body;
        expect(vacations).to.not.be.empty;
    });

    it("Should add a new vacation", async () => {
        const response = await supertest(app.server).post("/api/vacations")
            .set("Authorization", "Bearer " + token)
            .field("destination", "Egypt")
            .field("description", "A beautiful ancient country")
            .field("startVacation", "2025-05-08")
            .field("endVacation", "2025-05-12")
            .field("price", 4000)
            .field("image", image);
        const addedVacation = response.body;
        vacationAddedId = addedVacation.id;
        expect(addedVacation).to.contain.keys("id", "destination", "description", "startVacation", "endVacation", "price", "imageUrl", "imageUrl");
    });

    it("Should update a vacation", async () => {
        const response = await supertest(app.server).put("/api/vacations/" + vacationAddedId)
            .set("Authorization", "Bearer " + token)
            .field("id", vacationAddedId)
            .field("destination", "Egypt")
            .field("description", "A beautiful ancient country")
            .field("startVacation", "2025-05-08")
            .field("endVacation", "2025-05-12")
            .field("price", 4000)
            .field("image", image);
        const updatedVacation = response.body;
        expect(updatedVacation).to.not.be.empty;
    });

    it("Should delete a vacation", async () => {
        const response = await supertest(app.server).delete("/api/vacations/" + vacationAddedId)
            .set("Authorization", "Bearer " + token);
        expect(response.status).to.be.equal(StatusCode.NoContent);
    });

    it("Should add a like to vacation", async () => {
        const response = await supertest(app.server).post("/api/vacations/likes")
            .set("Authorization", "Bearer " + token)
            .field("userId", 38)
            .field("vacationId", 13)
            .field("isLiked", 0);
        const addedLike = response.body;
        expect(addedLike).to.contain.keys("userId", "vacationId");
    });

    it("Should remove a like from vacation", async () => { // Like already exist for this user so expect to error
        const response = await supertest(app.server).delete("/api/vacations/likes/38/13")
            .set("Authorization", "Bearer " + token)
            .field("userId", 38)
            .field("vacationId", 13)
            .field("isLiked", 1);
        expect(response.status).to.be.equal(StatusCode.NoContent);
    });

    it("Should response with a 404 error", async () => {
        const response = await supertest(app.server).get("/api/nothing-here");
        expect(response.status).to.be.equal(StatusCode.NotFound);
    });

});