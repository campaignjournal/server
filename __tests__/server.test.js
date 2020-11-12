const supertest = require("supertest")

const server = require("../api/server")

const db = require("../database/dbconfig")

let token = ""

describe("can ensure jest is functioning", () => {
    it("can console log something to prove its running", () => {
        console.log("You should drink your tea, Zuko!")
    })
})

describe("users router", () => {

    describe("/api/users/login", () => {
        it("denies login to the wrong credentials", () => {
            return supertest(server)
                .post("/api/users/login")
                .send({
                    username: "mars_admin",
                    password: "passwor",
                })
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("can log into the website", () => {
            return supertest(server)
                .post("/api/users/login")
                .send({
                    username: "mars_admin",
                    password: "password",
                })
                .then(res => {
                    token = res.body.token
                    expect(res.status).toBe(200)
                })
        })
    })

    describe("/api/users", () => {
        it("never lets us view users if we're unauthorized", () => {
            return supertest(server)
                .get("/api/users")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

        it("can get a list of users once logged in", () => {
            return supertest(server)
                .get("/api/users")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.data).toHaveLength(2)
                })
        })

    })

    describe("/api/users/:id", () => {
        it("can get a single user via id", () => {
            return supertest(server)
                .get("/api/users/1")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

        it("can edit a user if necessary", () => {
            return supertest(server)
                .put("/api/users/2")
                .set({ Authorization: token })
                .send({
                    username: "mars_admin3",
                    password: "password2",
                    email: "test2@test.com"
                })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

        it("edits fail under appropriate conditions", () => {
            return supertest(server)
                .put("/api/users/2")
                .set({ Authorization: token })
                .send({
                    username: "mars_admin3",
                    email: "test2@test.com"
                })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

    })

})

describe("campaign router", () => {

    beforeAll(async () => {
        await db("campaigns").truncate();
    })

    describe("api/campaigns", () => {
        it("can post a campaign", () => {
            return supertest(server)
                .post("/api/campaigns")
                .send({
                    desc: "Follow Edawal as he punches every single monster!",
                    name: "Journey through Madderay",
                    user_id: 1
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("fails to post if data is malformed", () => {
            return supertest(server)
                .post("/api/campaigns")
                .send({
                    desc: "Follow Edawal as he punches every single monster!",
                    user_id: 1
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can get a list of campaigns", () => {
            return supertest(server)
                .get("/api/campaigns")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.data).toHaveLength(1)
                })
        })

        it("fails to get campaigns if it lacks access", () => {
            return supertest(server)
                .get("/api/campaigns")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })

    })

    describe("api/campaigns/:id", () => {
        it("can get a campaign by id", () => {
            return supertest(server)
                .get("/api/campaigns/1")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("can edit a campaign by id", () => {
            return supertest(server)
                .put("/api/campaigns/1")
                .send({
                    desc: "Follow Edawal as he punches every single monster!",
                    name: "Journey through Madderay again!",
                    user_id: 1
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("fails to edit if data is malformed", () => {
            return supertest(server)
                .put("/api/campaigns/1")
                .send({
                    desc: "Follow Edawal as he punches every single monster!",
                    user_id: 1
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can delete a campaign as needed", () => {
            return supertest(server)
                .delete("/api/campaigns/1")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.body).toMatchObject({ "message": "Successfully deleted." })
                }))
        })

        it("fails to delete a campaign that doesn't exist", () => {
            return supertest(server)
                .delete("/api/campaigns/2")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.status).toBe(404)
                }))
        })
    })
})

describe("characters router", () => {

    beforeAll(async () => {
        await db("characters").truncate();
    })

    describe("/:id/characters", () => {
        it("can post a character", () => {
            return supertest(server)
                .post("/api/campaigns/1/characters")
                .send({
                    campaign_id: 1,
                    ancestry: "Changeling",
                    name: "Nem",
                    level: 5,
                    class: "Witch",
                    description: "A powerful witch"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("fails to post if data is malformed", () => {
            return supertest(server)
                .post("/api/campaigns/1/characters")
                .send({
                    campaign_id: 1,
                    ancestry: "Changeling",
                    level: 5,
                    class: "Witch",
                    description: "A powerful witch"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can get a list of characters", () => {
            return supertest(server)
                .get("/api/campaigns/1/characters")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.data).toHaveLength(1)
                })
        })

        it("fails to get characters if it lacks access", () => {
            return supertest(server)
                .get("/api/campaigns/1/characters")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    })

    describe("/:id/characters/:characterid", () => {
        it("can get a character by id", () => {
            return supertest(server)
                .get("/api/campaigns/1/characters/1")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("can edit a campaign by id", () => {
            return supertest(server)
                .put("/api/campaigns/1/characters/1")
                .send({
                    campaign_id: 1,
                    ancestry: "Changeling",
                    name: "Nem",
                    level: 6,
                    class: "Witch",
                    description: "A powerful witch"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("fails to edit if data is malformed", () => {
            return supertest(server)
                .put("/api/campaigns/1/characters/1")
                .send({
                    campaign_id: 1,
                    ancestry: "Changeling",
                    level: 6,
                    class: "Witch",
                    description: "A powerful witch"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can delete a campaign as needed", () => {
            return supertest(server)
                .delete("/api/campaigns/1/characters/1")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.body).toMatchObject({ "message": "Successfully deleted." })
                }))
        })

        it("fails to delete a campaign that doesn't exist", () => {
            return supertest(server)
                .delete("/api/campaigns/1/characters/2")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.status).toBe(404)
                }))
        })
    })

})

describe("country router", () => {

    beforeAll(async () => {
        await db("countries").truncate();
    })

    describe("/:id/countries/", () => {
        it("can post a country", () => {
            return supertest(server)
                .post("/api/campaigns/1/countries")
                .send({
                    campaign_id: 1,
                    ruler: "Emperor Ulgalash",
                    name: "Montazi",
                    founded: "Ancient times",
                    description: "Empire of beast people and philosophers"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("fails to post if data is malformed", () => {
            return supertest(server)
                .post("/api/campaigns/1/countries")
                .send({
                    campaign_id: 1,
                    ruler: "Emperor Ulgalash",
                    founded: "Ancient times",
                    description: "Empire of beast people and philosophers"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can get a list of countries", () => {
            return supertest(server)
                .get("/api/campaigns/1/countries")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.data).toHaveLength(1)
                })
        })

        it("fails to get countries if it lacks access", () => {
            return supertest(server)
                .get("/api/campaigns/1/countries")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    })

    describe("/:id/countries/:countryid", () => {
        it("can get a country by id", () => {
            return supertest(server)
                .get("/api/campaigns/1/countries/1")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("can edit a country by id", () => {
            return supertest(server)
                .put("/api/campaigns/1/countries/1")
                .send({
                    campaign_id: 1,
                    ruler: "Emperor Ulgalash II",
                    name: "Montazi",
                    founded: "Ancient times",
                    description: "Empire of beast people and philosophers"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("fails to edit if data is malformed", () => {
            return supertest(server)
                .put("/api/campaigns/1/countries/1")
                .send({
                    campaign_id: 1,
                    name: "Montazi",
                    founded: "Ancient times",
                    description: "Empire of beast people and philosophers"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can delete a country as needed", () => {
            return supertest(server)
                .delete("/api/campaigns/1/countries/1")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.body).toMatchObject({ "message": "Successfully deleted." })
                }))
        })

        it("fails to delete a country that doesn't exist", () => {
            return supertest(server)
                .delete("/api/campaigns/1/countries/2")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.status).toBe(404)
                }))
        })
    })
})

describe("history router", () => {

    beforeAll(async () => {
        await db("history").truncate();
    })

    describe("/:id/worlds/:worldid/history", () => {
        it("can post a historical event", () => {
            return supertest(server)
                .post("/api/campaigns/1/worlds/1/history")
                .send({
                    world_id: 1,
                    name: "Fall of Sabune",
                    date: "150 years ago",
                    description: "Free Sabune got wrecked by some beast people"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("fails to post if data is malformed", () => {
            return supertest(server)
                .post("/api/campaigns/1/worlds/1/history")
                .send({
                    world_id: 1,
                    name: "Fall of Sabune",
                    description: "Free Sabune got wrecked by some beast people"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can get a list of historical events", () => {
            return supertest(server)
                .get("/api/campaigns/1/worlds/1/history")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.data).toHaveLength(1)
                })
        })

        it("fails to get historical events if it lacks access", () => {
            return supertest(server)
                .get("/api/campaigns/1/worlds/1/history")
                .then(res => {
                    expect(res.status).toBe(401)
                })
        })
    })

    describe("/:id/worlds/:worldid/history/:eventid", () => {
        it("can get a historical event by id", () => {
            return supertest(server)
                .get("/api/campaigns/1/worlds/1/history/1")
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("can edit a historical event by id", () => {
            return supertest(server)
                .put("/api/campaigns/1/worlds/1/history/1")
                .send({
                    world_id: 1,
                    name: "Fall of Sabune",
                    date: "180 years ago",
                    description: "Free Sabune got wrecked by some beast people"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("fails to edit if data is malformed", () => {
            return supertest(server)
                .put("/api/campaigns/1/worlds/1/history/1")
                .send({
                    world_id: 1,
                    date: "180 years ago",
                    description: "Free Sabune got wrecked by some beast people"
                })
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("can delete a historical event as needed", () => {
            return supertest(server)
                .delete("/api/campaigns/1/worlds/1/history/1")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.body).toMatchObject({ "message": "Successfully deleted." })
                }))
        })

        it("fails to delete a historical event that doesn't exist", () => {
            return supertest(server)
                .delete("/api/campaigns/1/worlds/1/history/2")
                .set({ Authorization: token })
                .then((res => {
                    expect(res.status).toBe(404)
                }))
        })
    })

})

describe("religions router", () => {

    beforeAll(async () => {
        await db("religions").truncate();
    })

    describe("/:id/worlds/:worldid/religions", () => {

    })

    describe("/:id/worlds/:worldid/religions/:relid", () => {

    })

})

describe("worlds router", () => {

    beforeAll(async () => {
        await db("worlds").truncate();
    })

    describe("/:id/worlds/", () => {

    })

    describe("/:id/worlds/:worldid", () => {

    })

})
