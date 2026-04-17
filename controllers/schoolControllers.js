import { getDb } from "../index.js";
import { getDistance } from "../utils/distance.js";
import { addSchoolSchema, listSchoolSchema } from "../validators/validate.js";

export let addSchool = async(req, res, next)=>{
    try
    {
        let db = getDb();
        // await db.execute(`create table if not exists schools (
        //         id int primary key auto_increment,
        //         name varchar(100) not null,
        //         address varchar(100) not null,
        //         latitude float not null,
        //         longitude float not null
        //     )`);
        let result = addSchoolSchema.safeParse(req.body);
        if(!result.success)
        {
            let errors = result.error.issues.map((error)=>({
                field: error.path[0],
                message: error.message
            }))
            return res.status(400).json({ success: false, message: errors });
        }
        let latitude = parseFloat(result.data.latitude);
        let longitude = parseFloat(result.data.longitude);

        await db.execute(`insert into schools (name, address, latitude, longitude) values (?, ?, ?, ?)`,[result.data.name, result.data.address, latitude, longitude]);

        return res.status(201).json({ success: true, msg: "School added successfully" });
    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export let listSchools = async(req, res)=>{
    try
    {
        let db = getDb();
        let result = listSchoolSchema.safeParse(req.query);
        if(!result.success)
        {
            let errors = result.error.issues.map((error)=>({
                field: error.path[0],
                message: error.message
            }))
            return res.status(400).json({ success: false, message: errors });
        }
        let latitude = parseFloat(result.data.latitude);
        let longitude = parseFloat(result.data.longitude);
        let [schools] = await db.execute(`select * from schools`);
        let sorted = schools.map((school)=>({
            ...school,
            distance_in_km: parseFloat(
                getDistance(latitude, longitude, school.latitude, school.longitude).toFixed(2)
            )
        })).sort((a, b)=> a.distance_in_km - b.distance_in_km);

        return res.status(200).json({ success: true, schools: sorted, user_location: { latitude: latitude, longitude: longitude } });

    }
    catch(error)
    {
        console.log(error.message);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}