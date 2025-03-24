export const seedData = {
    users: {
      _model: "User",
      john: {
        firstName: "John",
        lastName: "Jackson",
        email: "john@jackson.com",
        password: "password",
      },
      jack: {
        firstName: "Jack",
        lastName: "Johnson",
        email: "jack@johnson.com",
        password: "password",
      },
      michael: {
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael@johnson.com",
        password: "password",
      }
    },
    categorys: {
        _model: "Category",
        trail: {
            title: "Famous Trails",
            userId: "->users.john"
        }
    },
    placemarks: {
        _model: "Placemark",
        placemark_1: {
            title: "Main Guard Clonmel",
            description: "Lovely sight to see",
            latitude: 150,
            longitude: 180,
            categoryId: "->categorys.trail"

        },
        placemark_2: {
            title: "Sulivans Kilsheelan",
            description: "Smashing pub in kilsheelan",
            latitude: 110,
            longitude: 170,
            categoryId: "->categorys.trail"
        },
        placemark_3: {
            title: "Holy Cross Clonmel",
            description: "Cross up high looking over the town",
            latitude: 450,
            longitude: 865,
            categoryId: "->categorys.trail"
        },
    }
}

  