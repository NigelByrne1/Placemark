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
    },
  },
  categorys: {
    _model: "Category",
    landmarks: {
      title: "Landmarks",
      userid: "->users.john",
    },
    pubs: {
      title: "Pubs & Cafés",
      userid: "->users.jack",
    },
    hiking: {
      title: "Hiking Trails",
      userid: "->users.michael",
    },
    historical: {
      title: "Historical Sites",
      userid: "->users.john",
    },
  },
  placemarks: {
    _model: "Placemark",

    // Landmarks
    main_guard: {
      name: "Main Guard",
      description: "Iconic 17th-century building in the town center",
      latitude: 52.353,
      longitude: -7.703,
      categoryid: "->categorys.landmarks",
    },
    old_bridge: {
      name: "Old Bridge",
      description: "Historic pedestrian bridge over the River Suir",
      latitude: 52.355,
      longitude: -7.695,
      categoryid: "->categorys.landmarks",
    },
    town_park: {
      name: "Clonmel Town Park",
      description: "Green space with walking paths and playgrounds",
      latitude: 52.352,
      longitude: -7.700,
      categoryid: "->categorys.landmarks",
    },

    // Pubs & Cafés
    careys_pub: {
      name: "Carey's Irish Pub",
      description: "Traditional pub with live music and pints",
      latitude: 52.350,
      longitude: -7.705,
      categoryid: "->categorys.pubs",
    },
    mr_bumbles: {
      name: "Mr. Bumble's Café",
      description: "Local favorite for coffee and cake",
      latitude: 52.354,
      longitude: -7.698,
      categoryid: "->categorys.pubs",
    },
    the_planet: {
      name: "The Planet",
      description: "Bar and entertainment venue near the town center",
      latitude: 52.356,
      longitude: -7.704,
      categoryid: "->categorys.pubs",
    },

    // Hiking Trails
    sliabh_na_mban: {
      name: "Sliabh na mBan Trailhead",
      description: "Starting point for the mountain hike",
      latitude: 52.365,
      longitude: -7.683,
      categoryid: "->categorys.hiking",
    },
    glen_of_aherlow: {
      name: "Glen of Aherlow Lookout",
      description: "Popular viewpoint east of Clonmel",
      latitude: 52.397,
      longitude: -7.764,
      categoryid: "->categorys.hiking",
    },
    marlfield_walk: {
      name: "Marlfield Lake Walk",
      description: "Easy riverside trail with birdwatching",
      latitude: 52.345,
      longitude: -7.722,
      categoryid: "->categorys.hiking",
    },

    // Historical Sites
    st_marys: {
      name: "St. Mary's Church",
      description: "Medieval church with beautiful stained glass",
      latitude: 52.351,
      longitude: -7.702,
      categoryid: "->categorys.historical",
    },
    west_gate: {
      name: "West Gate",
      description: "Old stone gate entrance to the town",
      latitude: 52.353,
      longitude: -7.706,
      categoryid: "->categorys.historical",
    },
    clonmel_museum: {
      name: "Clonmel Museum",
      description: "Local heritage exhibits and artifacts",
      latitude: 52.352,
      longitude: -7.701,
      categoryid: "->categorys.historical",
    },
  },
};
