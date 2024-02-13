const db = require('../config/connection');
const {User, FoodTruck, Category} = require('../models');
const userSeeds = require('./userSeed.json');
const foodTruckSeeds = require('./foodTruckSeed.json');
const categorySeeds = require('./categorySeed.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {

        await cleanDB('User', 'users');
        await cleanDB('FoodTruck', 'foodtrucks');
        await cleanDB('Category', 'categories');
        await User.create(userSeeds);

        const trucks = await FoodTruck.create(foodTruckSeeds);
        console.log("CREATED TRUCKS");
        console.log(trucks);

        const categories = await Category.create(categorySeeds);

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

        for (let j = 0; j < trucks.length; j++) {

            const truckCategory = trucks[j].category;
            for (let k = 0; k < categories.length; k++) {
                if (categories[k].name == truckCategory) {
                    console.log("FOUND NEW TRUCK TO ADD TO CATEGORIES");
                    const category = await Category.updateOne(
                        {name: truckCategory},
                        {$addToSet: {trucks: trucks[j]}}
                    );
                    console.log("UPDATED CATEGORY");
                    console.log(category);
                }
            }
        }



    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});


