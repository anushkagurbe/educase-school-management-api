import { z } from "zod";

export let listSchoolSchema = z.object({
    latitude: z.coerce
                .number({ message: "latitude is required.", invalid_type_error: "latitude must be a number." })
                .min(-90, { message: "latitude must be >= -90."})
                .max(90, { message: "latitude must be <= 90."}),
    longitude: z.coerce
                .number({ message: "longitude is required.", invalid_type_error: "longitude must be a number." })
                .min(-180, { message: "longitude must be >= -180."})
                .max(180, { message: "longitude must be <= 180."})
});

export let addSchoolSchema = listSchoolSchema.extend({
    name: z.string({ message: "School name is required" })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(100, { message: "Name must not exceed 100 characters" })
            .trim(),
    address: z.string({ message: "Address is required" })
                .min(2, { message: "Address must be at least 3 characters long" })
                .max(100, { message: "Address must not exceed 100 characters" })
                .trim()      
})

