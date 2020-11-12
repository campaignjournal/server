const supertest = require("supertest")

const server = require("../api/server")

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

    describe("api/campaigns", () => {

    })

    describe("api/campaigns/:id", () => {
        
    })
    

})

describe("characters router", () => {

    describe("/:id/characters", () => {

    })

    describe("/:id/characters/:characterid", () => {
        
    })

})

describe("country router", () => {

    describe("/:id/countries/", () => {

    })

    describe("/:id/countries/:countryid", () => {
        
    })
})

describe("history router", () => {
    
    describe("/:id/worlds/:worldid/history", () => {

    })

    describe("/:id/worlds/:worldid/history/:eventid", () => {
        
    })

})

describe("religions router", () => {

    describe("/:id/worlds/:worldid/religions", () => {

    })

    describe("/:id/worlds/:worldid/religions/:relid", () => {
        
    })

})

describe("worlds router", () => {

    describe("/:id/worlds/", () => {

    })

    describe("/:id/worlds/:worldid", () => {
        
    })

})