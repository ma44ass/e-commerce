
import { Category } from '@/payload-types';

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ctx})=> {

    const data = await ctx.db.find({
        collection: "categories",
        depth:1,      //Populate subcategories, subcategory[0] will be a type of "category"
        pagination:false,
        where: {
            parent : {
                exists: false,
            },
        },
        sort:"name"
    });

        const formattedData = data.docs.map((doc) => ({
            ...doc,
            subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                ...(doc as Category),
                // because Of "depth 1" doc will be a type od "Category"
            subcategories: undefined,
            }))
        }));

        return formattedData;
    })

})
