const db = require('../config/connection');
const {User, FoodTruck} = require('../models');
const userSeeds = require('./userSeed.json');
const foodTruckSeeds = require('./foodTruckSeed.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {

        await cleanDB('User', 'users');
        await cleanDB('FoodTruck', 'foodtrucks');

        await User.create(userSeeds);

        const trucks = await FoodTruck.create(foodTruckSeeds);
        console.log("CREATED TRUCKS");
        console.log(trucks);
        //will just add trucks to one user for the seeding
        const exampleUser = await User.findOne({email: "mkanatalexander@foodtruckdepot.dev"});
        console.log("FOUND USER");
        console.log(exampleUser);

        for (let i = 0; i < trucks.length; i++) {

            //current truck's owner (email address)
            const truckOwner = trucks[i].owner

            if (exampleUser.email == truckOwner) {
                //adding new truck to user
                console.log("FOUND NEW TRUCK TO ADD");
                const user = await User.updateOne(
                    {email: exampleUser.email},
                    {$addToSet: {trucks: trucks[i]}}
                );
            };
        }



    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});


